const test = require('ava')
const { spy } = require('sinon')
const { broadcastEffectRanges, sendPosts, updateClientMonitorRange } = require('./webSocketServer')

test('#broadcastEffectRanges should broadcast to those clients with range inside/behind the location', t => {
  const effectLocation = 3
  const posts = [0, 1, 2, 3, 4, 5, 6]
  const clients = new Map()
  clients.set('client_0_2', { send: spy(), from: 0, to: 2 })
  clients.set('client_1_3', { send: spy(), from: 1, to: 3 })
  clients.set('client_2_4', { send: spy(), from: 2, to: 4 })
  clients.set('client_3_5', { send: spy(), from: 3, to: 5 })
  clients.set('client_4_6', { send: spy(), from: 4, to: 6 })

  broadcastEffectRanges(effectLocation, clients, posts)

  t.false(clients.get('client_0_2').send.called)
  t.true(clients.get('client_1_3').send.calledOnce)
  t.true(clients.get('client_2_4').send.calledOnce)
  t.true(clients.get('client_3_5').send.calledOnce)
  t.true(clients.get('client_4_6').send.calledOnce)
})

test('#sendPosts should slice part of posts and send it', t => {
  const client = {
    from: 3,
    to: 5,
    send: spy()
  }
  const posts = [0, 1, 2, 3, 4, 5, 6]

  sendPosts(client, posts)

  t.true(client.send.calledOnce)
  t.true(client.send.calledWithExactly({
    total: 7,
    posts: [3, 4, 5]
  }))
})

test(`#updateClientMonitorRange should update client's range, and send with new range`, t => {
  const client = {
    from: 0,
    to: 2,
    send: spy()
  }
  const newRange = {
    from: 3,
    to: 5
  }
  const posts = [0, 1, 2, 3, 4, 5, 6]

  updateClientMonitorRange(client, newRange, posts)

  t.is(client.from, newRange.from)
  t.is(client.to, newRange.to)
  t.true(client.send.calledOnce)
  t.true(client.send.calledWithExactly({
    total: 7,
    posts: [3, 4, 5]
  }))
})
