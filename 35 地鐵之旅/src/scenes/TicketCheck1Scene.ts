class TicketCheck1Scene extends eui.Component implements  eui.UIComponent {
	
	private platformGroup: eui.Group;
	private lineRepo = new LineRepository();

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected async childrenCreated(): Promise<void>
	{
		super.childrenCreated();
		await this.playMP3();
		this.enablePlatform();
		this.platformGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlatformClick, this);
		
	}

	private onPlatformClick(): void
	{
		Main.instance.gotoScene(new WaitingScene(this.lineRepo.line1,1));
	}

	private async playMP3(): Promise<void>
	{
		await lzlib.SoundUtility.playSound('sound 54 (e_directionSun.mp3)_mp3');
		await lzlib.SoundUtility.playSound('sound 26 (go_1_2.mp3)_mp3');
		await lzlib.SoundUtility.playSound('sound 18 (inst_c_plm.mp3)_mp3');
	}

	private enablePlatform(): void
	{
		this.platformGroup.alpha = 1;
	}
	
}