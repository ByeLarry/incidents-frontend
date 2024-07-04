export class SocketService {
  private socket: WebSocket | null = null;
  public connect(url: string) {
    this.socket = new WebSocket(url);
    return this.socket;
  }
  public close() {
    this.socket?.close();
    this.socket = null;
  }
}
