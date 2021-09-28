import { io, Socket as IOSocket } from 'socket.io-client'
import EventEmitter from 'events'
import * as Notifications from 'expo-notifications'
import { ICallback } from '../interfaces/ICallbacks'
import { domain } from './Constants'
import { getAuth } from './Functions'
import IAlertProps from '../interfaces/IAlertProps'

interface ISocketInit {
  onAlert?: (_alert: IAlertProps) => void
}

export default class Socket {
  private static socket: IOSocket | null = null

  private static INSTANCE: Socket

  private static expoPushToken: string

  private emitter: EventEmitter

  constructor() {
    this.emitter = new EventEmitter()
  }

  static setPushToken(expoPushToken: string) {
    if (this.socket) this.socket.emit('expoPushToken', expoPushToken)
    this.expoPushToken = expoPushToken
  }

  public static on(name: string, callback: ICallback<any>) {
    this.socket?.on(name, callback)
  }

  private static reloader: Map<string, ICallback<string>> = new Map<
    string,
    ICallback<string>
  >()

  public static onReload(path: string, callback: ICallback<any>) {
    this.reloader.set(path, callback)
  }

  private static init(initData?: ISocketInit) {
    getAuth().then(({ auth }) => {
      const timeout = 3000
      this.socket = io(domain, {
        auth: {
          ...auth,
          expoPushToken: this.expoPushToken,
        },
        timeout,
        forceNew: true,
        reconnection: false,
      })
      const to = setTimeout(() => {
        this.getSocketInstance().emitter.emit('error')
        console.log('this.socket.io::timeout')
      }, timeout)
      this.socket.on('ping', () => {
        this.socket?.emit('pong')
      })
      this.socket.on('alert', (data: IAlertProps) => {
        initData?.onAlert?.(data)
      })
      this.socket.on('reload', path => {
        this.reloader.get(path)?.(path)
      })
      this.socket.on('connect', () => {
        clearTimeout(to)
        console.log('this.socket.io::connect', this.socket?.id)
        if (this.socket?.id !== undefined)
          this.getSocketInstance().emitter.emit('connected')
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
      this.socket.on('error', (error: string) => {
        console.log('this.socket.io::error', error)
      })
      this.socket.on('welcome', async () => {
        const expoPushToken = (await Notifications.getExpoPushTokenAsync()).data
        if (this.socket) this.socket.emit('expoPushToken', expoPushToken)
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
    })
  }

  public static onConnect(callback: () => void) {
    this.getSocketInstance().emitter.addListener('connected', callback)

    return this
  }

  public static onError(callback: () => void) {
    this.getSocketInstance().emitter.addListener('error', callback)

    return this
  }

  public static getInstance(initData?: ISocketInit): IOSocket | null {
    if (!this.socket) this.init(initData)
    if (!this.INSTANCE) this.INSTANCE = new Socket()

    return this.socket
  }

  private static getSocketInstance() {
    if (!this.INSTANCE) this.INSTANCE = new Socket()

    return this.INSTANCE
  }

  public static close(r?: number) {
    console.log('socket.io::closing', r ?? -1, this.socket === null)
    this.getInstance({})?.disconnect()
    this.socket = null
  }

  public static open(initData?: ISocketInit) {
    console.log('socket.io::opening')
    this.getInstance(initData)

    return this
  }
}
