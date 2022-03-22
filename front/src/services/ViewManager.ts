import router from '../router'
import io from 'socket.io-client'

interface IViewManager {
  changeView(): void
  checkStatus(): void
  stopCheckingStatus(): void
}
type SetIntervalType = ReturnType<typeof setInterval>
type SocketIoType = ReturnType<typeof io>

class ViewManager implements IViewManager {
  private interval: undefined | SetIntervalType
  private status = ''
  private socket: undefined | SocketIoType

  changeView() {
    switch (this.status) {
      case 'CONNECTED':
        router.push({ name: 'connected' })
        break
      case 'FAILED':
        router.push({ name: 'failed' })
        break
      case 'ANSWERED':
        router.push({ name: 'answered' })
    }
  }
  checkStatus() {
    this.socket = io('https://3000-ckrewone-webapp-s7ryy2c43eh.ws-eu38.gitpod.io/', {
        reconnection: false,
        transports: ["websocket", "polling"]
    });
    this.socket.on('status', (status) => {
        console.log(status)
        this.status = status
        this.changeView()
    })
  }
  stopCheckingStatus() {
    this.socket?.close()
  }

}

export default new ViewManager()