import css from './css/convertToJs'
import { getRuleName } from './publicodes/utils'
import { Card } from './UI'

export default function NextQuestions({ nextQuestions, rules }) {
  return nextQuestions.length ? (
    <div
      style={css`
        margin-top: 0.4rem;
        display: flex;
        align-items: center;
      `}
    >
      <h3
        style={css`
          width: 8rem;
          margin: 0;
        `}
      >
        À suivre
      </h3>
      <div
        style={css`
          overflow: scroll;
          height: 1.8rem;
          width: 100%;
          white-space: nowrap;
          padding-top: 0.1rem;
        `}
      >
        <ol
          style={css`
            display: flex;
          `}
        >
          {nextQuestions.slice(1).map((question) => (
            <li
              style={css`
                width: auto;
                margin-right: 2rem;
              `}
              key={question}
            >
              <small>{rules[question].titre || getRuleName(question)}</small>
            </li>
          ))}
        </ol>
      </div>
    </div>
  ) : (
    <Card
      style={css`
        margin: 1rem 0;
        text-align: center;
        padding: 1.6rem 0;
      `}
    >
      ⭐️ Vous avez terminé.
    </Card>
  )
}
