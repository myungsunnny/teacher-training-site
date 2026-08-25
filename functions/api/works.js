const MAX_LEN = { title: 80, description: 200, link: 500 }

function isValidUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    'SELECT id, title, author, description, link, created_at FROM works ORDER BY created_at DESC LIMIT 60'
  ).all()

  return Response.json({ works: results })
}

export async function onRequestPost({ request, env }) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: '요청 형식이 올바르지 않아요.' }, { status: 400 })
  }

  const title = String(body.title ?? '').trim()
  const description = String(body.description ?? '').trim()
  const link = String(body.link ?? '').trim()

  if (!title || !link) {
    return Response.json({ error: '제목과 링크는 꼭 입력해주세요.' }, { status: 400 })
  }
  if (!isValidUrl(link)) {
    return Response.json({ error: '링크는 http:// 또는 https://로 시작하는 주소여야 해요.' }, { status: 400 })
  }
  if (title.length > MAX_LEN.title || description.length > MAX_LEN.description || link.length > MAX_LEN.link) {
    return Response.json({ error: '입력 내용이 너무 길어요.' }, { status: 400 })
  }

  await env.DB.prepare(
    'INSERT INTO works (title, author, description, link) VALUES (?, ?, ?, ?)'
  ).bind(title, '', description, link).run()

  return Response.json({ ok: true }, { status: 201 })
}
