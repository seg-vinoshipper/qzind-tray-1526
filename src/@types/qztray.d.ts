// Module definitions created from documentation at https://qz.io/api/.
// Not all definitions have been implemented and properly tested
// https://github.com/qzind/tray/issues/890
declare module 'qz-tray' {

  type QZGetVersionOptions = {
    details?: boolean
  }
  type QZGetVersionDetails = {
    email: string | null
    title: string | null
    url: string | null
    vendor: string | null
    version: string | null
  }

  type Api = {
    getVersion(options?: QZGetVersionOptions): Promise<string | QZGetVersionDetails | Error>;
    isVersionGreater(major: string | number, minor: string | number, patch: string | number, build: string | number): boolean;
    isVersionLess(major: string | number, minor: string | number | undefined, patch: string | number | undefined, build: string | number | undefined): boolean;
    setPromiseType(promiser: function): void;
    setSha256Type(hasher: function);
    setWebSocketType(ws: Websocket);
    showDebug(show: boolean): void;
  }

  type ConfigDensity = {
    cross?: number; // 0
    feed?: number; // 0
  }

  type ConfigOptions = Partial<{
    bounds: object,
    colorType: 'color' | 'grayscale' | 'blackwhite',
    copies: number, // 1
    density: number | number[] | ConfigDensity | ConfigDensity[] | string,
    duplex: boolean | string,
    fallbackDensite: number,
    interpolation: 'bicubic' | 'bilinear' | 'nearest-neighbor',
    jobName: string,
    margins: number | { top: number, right: number, bottom: number, left: number },
    orientation: 'portrait' | 'landscape' | 'reverse-landscape' | 'null',
    paperThickness: number,
    printerTray: string | number,
    rasterize: boolean,
    rotation: number,
    scaleContent: boolean,
    size: { width?: number, height?: number },
    units: string,
    forceRaw: boolean,
    encoding: string | { from?: string, to?: string },
    endOfDoc: string,
    perSpool: boolean,
    retainTemp: boolean,
    spool: { size?: number, end?: string }
  }>

  type Configs = {
    create(printer: null | string | { name?: string, file?: string, host?: string, port?: string }, options?: ConfigOptions): ConfigOptions;
    // setDefaults(options) // prob not needed
  }

  type HidDevice = {
    vendorId: string;
    productId: string;
    usagePage: string;
    serial: string;
    manufacturer?: string;
    product?: string;
  }

  type HidDataCallback = {
    vendorId: string;
    productId: string;
    type: 'RECEIVE' | 'ACTION' | 'ERROR',
    output: string[];
    exception?: string;
    actionType?: string;
  }

  type NetworkingDevice = {
    hostname: string;
    port: string;
  }

  type Hid = {
    claimDevice(deviceInfo: HidDevice): Promise<void>;
    closeStream(deviceInfo: HidDevice): Promise<void>;
    getFeatureReport(deviceInfo: HidDevice & { responseSize: number }): Promise<string>;
    isClaimed(deviceInfo: HidDevice): Promise<boolean>;
    listDevices(): Promise<HidDevice[]>;
    openStream(deviceInfo: Partial<HidDevice> & Partial<{ responseSize: number, interval: number }>): Promise<void>;
    readData(deviceInfo: HidDevice): Promise<void>;
    releaseDevice(deviceInfo: HidDevice): Promise<void>;
    sendData(deviceInfo: HidDevice & { data: number, endpoint: number, reportId: number, type?: 'FILE' | 'PLAIN' | 'HEX' | 'BASE64' }): Promise<void>;
    sendFeatureReport(deviceInfo: HidDevice): Promise<void>;
    setHidCallbacks(calls: HidDataCallback[]): void;
    startListening(): Promise<void>;
    stopListening(): Promise<void>;
  }

  type Networking = {
    device(hostname?: string, port?: number): Promise<NetworkingDevice | Error>;
    devices(hostname?: string, port?: number): Promise<NetworkingDevice[] | Error>;
    hostname(): Promise<string | Error>;
  }

  type PrinterDetails = {
    connection: string;
    default: boolean;
    density: number;
    driver: string;
    name: string;
  }

  type PrinterStatusCode = 'connecting-to-device'
    | 'cups-waiting-for-job-completed'
    | 'offline-report'
    | 'idle'
    | 'job-completed-successfully'
    | 'job-hold-until-specified'
    | 'job-printing'
    | 'processing'
    | string;

  type PrinterStatusText = 'COMPLETE'
    | 'OFFLINE'
    | 'OK'
    | 'PAUSED'
    | 'PROCESSING'
    | 'PRINTING'
    | string;

  // This type is not documented in the qz.io/api docs
  // and is most likely not accurate
  type PrinterStatusEvent = {
    eventType: 'JOB' | 'PRINTER';
    jobId?: number;// for JOB eventType
    jobName?: string;// for JOB eventType
    message: string;
    printerName: string;
    severity: 'INFO' | 'FATAL' | 'WARN' | string;
    statusCode: PrinterStatusCode;
    statusText: PrinterStatusText;
    type: 'ACTION' | 'ERROR' | 'RECEIVE'; // in their docs as status
  }

  type Printers = {
    details(): Promise<PrinterDetails[]>;
    find(query?: string, signature?: string, signingTimestamp?: number): Promise<string[] | string>;
    getDefaults(signature?: string, signingTimestamp?: number): Promise<string>;
    getStatus(): Promise<void>; // should trigger a printer callback
    setPrinterCallbacks(calls: (data: unknown) => void): void;
    startListening(
      printers?: string | string[],
      options?: {
        jobData?: null | boolean, // default false
        maxJobData?: null | number, // default -1
        flavor?: null | 'base64' | 'hex' | 'plain', // default 'plain' (docs say Windows only though)
      }
    ): Promise<null | Error>;
    stopListening(): Promise<null | Error>;
  }

  type ResolvePromise = (value?: unknown) => void;
  type Security = {
    setCertificatePromise(handler: (resolve: ResolvePromise, reject: ResolvePromise) => void): void;
    setSignatureAlgorithm(algorithm: string): void;
    setSignaturePromise(handler: (toSign: string) => (resolve: (value: string) => string, reject: (value: string) => string) => void);
  }

  type HidCommunicationSettings = {
    start?: string | string[];
    end?: string;
    width?: number;
    untilNewlink?: boolean;
    lengthBytes?: number | { index?: number, length?: number, endian?: 'BIG' | 'LITTLE' }
    includeHeader?: boolean; // false
  }

  type PortOptions = {
    baudRate?: number; // 9600
    dataBits?: number; // 8
    stopBits?: number; // 1
    parity?: 'NONE' | 'EVEN' | 'ODD' | 'MARK' | 'SPACE' | 'AUTO'; // NONE
    flowControl?: 'NONE' | 'XONXOFF' | 'XONXOFF_OUT' | 'XONXOFF_IN' | 'RTSCTS' | 'RTSCTS_OUT' | 'RTSCTS_IN' | 'AUTO'; // NONE
    encoding?: 'UTF-8' | string,
    rx?: HidCommunicationSettings;
  }
  type SerialDataCallback = (data: { portName: string, type: 'RECEIVE' | 'ERROR' | string, output: string, exception?: string }) => void;
  type Serial = {
    closePort(port: string): void;
    findPorts(): Promise<string[]>;
    openPort(port: string, options?: PortOptions): Promise<void>;
    sendData(port: string, data: string | string[] | { type: 'FILE' | 'PLAIN' | 'HEX' | 'BASE64', data: string | string[] }, options?: PortOptions): Promise<void>;
    setSerialCallbacks(calls: SerialDataCallback[]): void;
  }

  // string values must be hex representation of the number
  type DeviceInfo = {
    vendorId: string,
    productId?: string,
  }

  type InterfaceInfo = DeviceInfo & { interface: string };
  type EndpointInfo = DeviceInfo & { endpoint: string };
  type ReadDataInfo = EndpointInfo & { responseSize?: number };
  type OpenStreamInfo = ReadDataInfo & { interval?: number };
  type SendDataInfo = EndpointInfo & { data: number[] | string, type?: 'FILE' | 'PLAIN' | 'HEX' | 'BASE64' }
  type Callback = () => void;
  type EventCallback = (event: Event) => void;
  type UsbDevice = DeviceInfo & { hub: boolean };

  type Usb = {
    claimDevice(info: InterfaceInfo): Promise<null>;
    closeStream(info: EndpointInfo): Promise<null>;
    isClaimed(info: DeviceInfo): Promise<boolean>;
    listDevices(includeHubs: boolean): Promise<UsbDevice[]>;
    listEndpoints(info: InterfaceInfo): Promise<string[]>;
    listInterfaces(info: DeviceInfo): Promise<string[]>;
    openStream(info: OpenStreamInfo): Promise<null>;
    readData(info: ReadDataInfo): Promise<string[]>;
    releaseDevice(info: DeviceInfo): Promise<null>;
    sendData(info: SendDataInfo): Promise<null>;
    setUsbCallbacks(calls: Callback | Callback[]): void;
  }

  type ConnectOptions = {
    host?: string | string[];
    port?: {
      secure?: number[];
      insecure?: number[];
    };
    usingSecure?: boolean;
    keepAlive?: number;
    retries?: number;
    delay?: number;
  }

  type Websocket = {
    connect: (options?: ConnectOptions) => Promise<null>;
    disconnect: () => Promise<null>;
    getConnectionInfo: () => { socket: string, host: string, port: number };
    isActive: () => boolean;
    setClosedCallbacks(calls: EventCallback[]): void;
    setErrorCallbacks(calls: EventCallback[]): void;
  }

  type PrintOptions = {
    language?: string;
    x?: number;
    y?: number;
    dotDensity?: string | number;
  }

  type PrintData = {
    data: string | ArrayBuffer;
    type: 'raw' | 'pixel'; // raw is default
    format: 'command' | 'image' | 'pdf'; // command is default
    flavor: 'base64' | 'file' | 'hex' | 'plain' | 'xml'; // plain is default
    // more options at https://qz.io/api/qz
    options?: PrintOptions;

  }

  export function print(
    configs: ConfigOptions[],
    data: PrintData[] | string[],
  ): Promise<void>;


  // Exported properties
  export const api: Api;
  export const configs: Configs;
  export const hid: Hid;
  export const networking: Networking;
  export const printers: Printers;
  export const security: Security;
  export const serial: Serial;
  export const usb: Usb;
  export const websocket: Websocket;
}
