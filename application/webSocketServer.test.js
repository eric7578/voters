const test = require('ava')
const { spy } = require('sinon')
const { broadcastEffectRanges } = require('./webSocketServer')

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
