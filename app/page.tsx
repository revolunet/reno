import css from '@/components/css/convertToJs'
import Form from './Form'

export default function Page({ searchParams }) {
  return (
    <main
      style={css`
        width: 700px;
        max-width: 96vw;
        padding: 0 0.6rem;
        margin: 0 auto;
      `}
    >
      <h1>Mes Aides Rénovation 2024</h1>
      <p>
        Ce petit calculateur vous aide à savoir si vous pouvez prétendre à des
        aides pour la rénovation de votre logement.
      </p>
      <Form searchParams={searchParams} />
    </main>
  )
}
