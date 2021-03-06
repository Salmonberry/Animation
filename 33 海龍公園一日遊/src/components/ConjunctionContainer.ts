class ConjunctionContainer extends eui.Group implements  eui.UIComponent {
	private background: ConjunctionBackground;
	private drop: lzlib.Drop;

	public constructor() {
		super();
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.background = new ConjunctionBackground();
		this.background.visible = this.backgroundVisible;
		this.addChildAt(this.background, 0);
	}

	public get conjunctionComponent(): ConjunctionComponent
	{
		return this.$children.filter(child => child instanceof ConjunctionComponent).map(child => child as ConjunctionComponent)[0];
	}

	public set conjunctionComponent(value: ConjunctionComponent)
	{
		this.conjunctionComponent && this.removeChild(this.conjunctionComponent);
		if (value) {
			value.x = value.y = 0;
			this.addChild(value);
		}
	}

	public get text(): string {
		return this.conjunctionComponent ? this.conjunctionComponent.text : null;
	}

	public set text(value: string)
	{
		if (!this.conjunctionComponent) {
			this.addChild(new ConjunctionComponent());
		}
		this.conjunctionComponent.text = value;
	}

	public enableDrag(dataTransfer: Object): void
	{
		let drag = new lzlib.Drag();
		this.stage.addChild(drag);
		drag.enableDrag(this.conjunctionComponent, false, dataTransfer);
	}

	public enableDrop(onDrop: Function, thisArg: Object): void
	{
		this.drop = new lzlib.Drop();
		this.stage.addChild(this.drop);
		this.drop.enableDrop(this);
		this.addEventListener(lzlib.LzDragEvent.DROP, (e: lzlib.LzDragEvent) => {
			e.preventDefault();
			let targetObj = e.target as ConjunctionContainer;
			targetObj.conjunctionComponent = e.dragObject as ConjunctionComponent;
			onDrop.call(thisArg, e.data);
		}, this);
	}

	public disableDrop(): void
	{
		this.drop.disableDrop();
	}

	public blinkBackground(): void
	{
		this.background.visible = true;
		this.background.blink();
	}

	public hideBackground(): void
	{
		this.background.visible = false;
	}

	private _backgroundVisible = true;

	public get backgroundVisible(): boolean
	{
		return this._backgroundVisible;
	}

	public set backgroundVisible(value: boolean)
	{
		this._backgroundVisible = value;
		this.background && (this.background.visible = value);
	}
}