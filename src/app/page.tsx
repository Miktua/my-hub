"use client"
import { useState } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
export default function DeveloperProfile() {
  const [activeTab, setActiveTab] = useState('skills')

  const skills = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'HTML', 'CSS', 'Git']
  const projects: { name: string, description: string }[] = [
    // { name: 'E-commerce Platform', description: 'A full-stack e-commerce solution built with React and Node.js' },
    // { name: 'Task Management App', description: 'A React-based task manager with drag-and-drop functionality' },
    // { name: 'Portfolio Website', description: 'A responsive portfolio website showcasing my projects and skills' }
  ]
  const contacts = [
    { name: 'GitHub', url: 'https://github.com/Miktua', Icon: Github },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/d-pustovitenko/', Icon: Linkedin },
    { name: 'Email', url: 'mailto:dmytro.pustovitenko@gmail.com', Icon: Mail }
  ]
  const tabs = ['skills', 'employment', 'projects', 'contact']


  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <Image
            width={128}
            height={128}
            className="mx-auto h-32 w-32 rounded-full mt-5 object-cover"
            src="/profile.jpg"
            alt="Profile"
          />
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Dmytro Pustovitenko
          </h1>
          <p className="mt-2 text-xl">Frontend Developer</p>
        </header>

        <nav className="mb-8">
          <ul className="flex justify-center space-x-4">
            {tabs.map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === tab
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main>
          {activeTab === 'skills' && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Skills</h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <li
                    key={skill}
                  >
                    <Card>
                      <CardContent className='grid place-items-center p-3'>
                        {skill}
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === 'employment' && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Employment history</h2>
            </section>
          )}

          {activeTab === 'projects' && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Projects</h2>
              <ul className="space-y-4">
                {projects.map((project) => (
                  <li key={project.name} className="bg-card text-card-foreground rounded-lg p-4 shadow">
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === 'contact' && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
              <div className="flex justify-center space-x-4">
                  {contacts.map((contact) => (
                    <a key={contact.name} href={contact.url} target="_blank" rel="noopener noreferrer">
                      <contact.Icon className="h-8 w-8 hover:text-primary" />
                    </a>
                  ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}