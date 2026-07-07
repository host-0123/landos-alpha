import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { Concept } from './components/Concept'
import { Program } from './components/Program'
import { DressCode } from './components/DressCode'
import { Hosts } from './components/Hosts'
import { FinalCTA } from './components/FinalCTA'
import { event } from './data/event'

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Concept />
        <Program />
        <DressCode />
        <Hosts />
        <FinalCTA />
      </main>
      <footer className="border-t border-ink/10 py-8 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-cocoa">
          {event.name} · {event.title} · {event.location}
        </p>
      </footer>
    </>
  )
}
