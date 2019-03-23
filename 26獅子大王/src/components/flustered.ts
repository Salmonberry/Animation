class flustered extends eui.Component implements  eui.UIComponent {

	private flusteredAnim:egret.tween.TweenGroup;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.playAnimation(this.flusteredAnim,true);
	}
	
	public playAnimation(target: egret.tween.TweenGroup, isLoop: boolean): void {
		if (isLoop) {
			for (var key in target.items) {
				target.items[key].props = { loop: true };
			}
		}
		target.play();
	}

	public playVoice(str:string):void {
		GameStart.optionsScene.getOptionInstance.playVoice(str);
	}
	
}