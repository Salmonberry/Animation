class ButtonComponent extends eui.Component implements  eui.UIComponent {
	
	private textLabel: eui.Label;
	private backgroundImage: eui.Image;

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
		mouse.enable(this.stage);
		mouse.setButtonMode(this.textLabel, true);
		this.textLabel.text = this._text;
	}

	private _text = 'OK';

	public get text(): string
	{
		return this._text;
	}

	public set text(str: string)
	{
		this._text = str;
	}

	private _background = '';

	public get background(): string
	{
		return this._background;
	}

	public set background(str: string)
	{
		this._background = str;
		this.backgroundImage && (this.backgroundImage.source = str);
	}
	
}