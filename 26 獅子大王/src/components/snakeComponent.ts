class snakeComponent extends eui.Component implements eui.UIComponent {

	private snake_active: eui.Image
	private snake_hover: eui.Image

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();

		this.snake_active.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.hoverStatus, this)
		this.snake_hover.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.activeStatus, this)
		this.currentState = "active"
	}

	private playLoopAnim(Anim: egret.tween.TweenGroup): void {
		Anim.playLoopAsync();
	}

	private activeStatus(): void {
		this.currentState = "active";
	}

	private hoverStatus(): void {
		this.currentState = "hover";
		lzlib.SoundUtility.playSound("sound 131_mp3")
	}

	public clickStatus(): void {
		this.currentState = "click";
	}

}