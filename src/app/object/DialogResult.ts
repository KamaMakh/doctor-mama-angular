// исползьзуется в диалоговых окнах, где может быть множество действий с результатом, а не только ОК и отмена

export class DialogResult {
  action: DialogAction;
  obj: any;
  obj2: any;


  // ? означает необязательный параметр
  constructor(action: DialogAction, obj?: any, obj2?: any) {
    this.action = action;
    this.obj = obj;
    this.obj2 = obj2;
  }
}

// всевозможные действия в диалоговом окне (можно разбить по разным enum)
export enum DialogAction {
  SETTINGS_CHANGE, // настройки были изменены
  SAVE, // сохранение изменений
  UPDATE, // обновление
  OK, // для подтверждения действий
  CANCEL, // отмена всех действий
  DELETE, // удаление объекта
  CREATE, // создание объекта
  BLOCK, // блокировка
  UNBLOCK // разблокировка
}
