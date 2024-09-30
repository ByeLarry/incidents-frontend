export class SocketService {
  private socket: WebSocket | null = null;

  public connect(url: string): WebSocket {
    this.socket = new WebSocket(url);
    return this.socket;
  }

  public close(): void {
    this.socket?.close();
    this.socket = null;
  }
}
