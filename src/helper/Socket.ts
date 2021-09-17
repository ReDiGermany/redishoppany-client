import { io, Socket as IOSocket } from 'socket.io-client'
import { ICallback } from '../interfaces/ICallbacks'
import { domain } from './Constants'
import { getAuth } from './Functions'

export default class Socket {
  private static socket: IOSocket | null = null

  private static expoPushToken: string

  static setPushToken(expoPushToken: string) {
    if (this.socket) this.socket.emit('expoPushToken', expoPushToken)
    this.expoPushToken = expoPushToken
  }

  public static on(name: string, callback: ICallback<any>) {
    this.socket?.on(name, callback)
  }

  public static onReload(path: string, callback: ICallback<any>) {
    this.on('reload', d => {
      if (d === path) callback(d)
    })
  }

  private static init() {
    ;(async () => {
      const { auth } = await getAuth()

      this.socket = io(domain, {
        auth: {
          ...auth,
          expoPushToken: this.expoPushToken,
        },
        forceNew: true,
        reconnection: false,
      })
      this.socket.on('ping', () => {
        this.socket?.emit('pong')
      })
      this.socket.on('reload', path => {
        console.log('reload', path)
      })
      this.socket.on('connect', () => {
        console.log('this.socket.io::connect', this.socket?.id)
      })
      this.socket.on('connection', () => {
        console.log('this.socket.io::connection')
      })
      this.socket.on('disconnect', () => {
        console.log('this.socket.io::disconnect')
      })
      this.socket.on('status', (status: string) => {
        console.log('this.socket.io::status', status)
      })
      this.socket.on('welcome', () => {
        console.log('this.socket.io::welcome')
      })
      this.socket.on('connected', client => {
        console.log('this.socket.io-client::connection', client)
        client.on('status', (status: string) => {
          console.log('this.socket.io::status', status)
        })
        client.on('disconnected', () => {
          console.log('this.socket.io::disconnected', client)
        })
      })
    })()
  }

  public static getInstance(): IOSocket | null {
    if (!this.socket) this.init()

    return this.socket
  }

  public static close(r?: number) {
    console.log('socket.io::closing', r ?? -1, this.socket === null)
    this.getInstance()?.disconnect()
    this.socket = null
  }

  public static open() {
    console.log('socket.io::opening')
    this.getInstance()
  }
}