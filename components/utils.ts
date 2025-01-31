export const sortBy = (f) => (list) =>
  list.sort((a, b) => {
    const fa = f(a),
      fb = f(b)
    return fa < fb ? -1 : fa > fb ? 1 : 0
  })

export const capitalise0 = (s) => s[0].toUpperCase() + s.slice(1)
