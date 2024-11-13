
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';



const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper function to generate JWT token
const generateToken = (userId: string) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET || 'default-secret',
        { expiresIn: '24h' }
    );
};

// Helper function to create session
// const createSession = async (userId: string, token: string) => {
//     return await prisma.userSession.create({
//         data: {
//             userId,
//             token,
//             expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
//         }
//     });
// };
interface RequestBody {
    type: string;
    email?: string;
    password?: string;
    name?: string;
    idToken?: string;
    hash?: string;
    telegramData?: {
        id: string;
        first_name: string;
        last_name: string;
        username: string;
    };
}
// Email-password sign in
export async function POST(request: Request) {
    try {
        const { type, email, password, name, idToken, hash, telegramData }:RequestBody = await request.json();

        switch (type) {
            case 'email-password': {
                if (!email || !password) {
                    return NextResponse.json(
                        { error: 'Email and password are required' },
                        { status: 400 }
                    );
                }

                const user = await prisma.user.findUnique({ where: { email } });
                if (!user) {
                    return NextResponse.json(
                        { error: 'Invalid credentials' },
                        { status: 401 }
                    );
                }

                let validPassword = Boolean(user.password)
                if (user.password) bcrypt.compare(password, user.password,(_,res)=>{validPassword=res});
                if (!validPassword) {
                    return NextResponse.json(
                        { error: 'Invalid credentials' },
                        { status: 401 }
                    );
                }

                const token = generateToken(user.id);
                // await createSession(user.id, token);

                return NextResponse.json({ token, userId: user.id });
            }

            case 'email-password-signup': {
                if (!email || !password || !name) {
                    return NextResponse.json(
                        { error: 'Email, password and name are required' },
                        { status: 400 }
                    );
                }

                const existingUser = await prisma.user.findUnique({ where: { email } });
                if (existingUser) {
                    return NextResponse.json(
                        { error: 'Email already exists' },
                        { status: 400 }
                    );
                }

                let hashedPassword = ''
                bcrypt.hash(password, '10', (_,res)=>{hashedPassword=res});
                if(!hashedPassword){
                    return NextResponse.json(
                        { error: 'Internal server error' },
                        { status: 500 }
                    );
                }
                const user = await prisma.user.create({
                    data: {
                        email,
                        password: hashedPassword,
                        username: name
                    }
                });

                const token = generateToken(user.id);
                // await createSession(user.id, token);

                return NextResponse.json({ token, userId: user.id });
            }

            case 'oauth': {
                if (!idToken) {
                    return NextResponse.json(
                        { error: 'ID token is required' },
                        { status: 400 }
                    );
                }

                const ticket = await googleClient.verifyIdToken({
                    idToken,
                    audience: process.env.GOOGLE_CLIENT_ID
                });

                const payload = ticket.getPayload();
                if (!payload) {
                    return NextResponse.json(
                        { error: 'Invalid OAuth token' },
                        { status: 401 }
                    );
                }

                let user = await prisma.user.findUnique({
                    where: { email: payload.email }
                });

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            email: payload.email!,
                            username: payload.name!,
                            oauthProvider: 'google',
                            oauthId: payload.sub
                        }
                    });
                }

                const token = generateToken(user.id);
                // await createSession(user.id, token);

                return NextResponse.json({ token, userId: user.id });
            }

            case 'telegram': {
                if (!hash || !telegramData) {
                    return NextResponse.json(
                        { error: 'Telegram data is required' },
                        { status: 400 }
                    );
                }

                // Validate Telegram hash
                const checkString = Object.keys(telegramData)
                    .sort()
                    .map(k => `${k}=${telegramData[k as keyof typeof telegramData]}`)
                    .join('\n');

                const secretKey = crypto.createHash('sha256')
                    .update(process.env.TELEGRAM_BOT_TOKEN || '')
                    .digest();

                const hmac = crypto.createHmac('sha256', secretKey)
                    .update(checkString)
                    .digest('hex');

                if (hmac !== hash) {
                    return NextResponse.json(
                        { error: 'Invalid Telegram hash' },
                        { status: 401 }
                    );
                }

                let user = await prisma.user.findFirst({
                    where: { telegram_id: telegramData.id.toString() }
                });

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            telegram_id: telegramData.id.toString(),
                            full_name: `${telegramData.first_name} ${telegramData.last_name || ''}`.trim(),
                            username: telegramData.username
                        }
                    });
                }

                const token = generateToken(user.id);
                // await createSession(user.id, token);

                return NextResponse.json({ token, userId: user.id });
            }

            default:
                return NextResponse.json(
                    { error: 'Invalid authentication type' },
                    { status: 400 }
                );
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

