interface ISecondLevelSelectView 
{
    playAudio(audioName: string): void;

    /** 设置场景的背景图片 */
    addSceneBackground(place: Place, sceneIndex: number): void;
    /** 删除场景的背景图片 */
    removeSceneBackground(sceneIndex: number): void;

    /** 添加人物 */
    addPerson(person: Person, dropPoint: egret.Point, sceneIndex: number): void;
    /** 删除人物 */
    removePerson(person: Person, sceneIndex: number): void;

    /** 添加运动 */
    addThing(thing: Thing, dropPoint: egret.Point, sceneIndex: number): void;
    /** 删除动动 */
    removeThing(thing: Thing, sceneIndex: number): void;

    stopCurrentSoundChannel(): void;

    showAnswerView(): void;
    hideAnswerView(): void;

    showSceneCompareResult(compareResults: SceneCompareResult[]): void;
    hideSceneCompareResult();

    playWrongAudio(): void;
    playCorrectAudio(): void;
}