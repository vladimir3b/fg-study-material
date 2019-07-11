class Lesson01 {

  static log(): void {
    console.log('Message from lesson 1.');
  }

  static addFunction(id: string, eventRespondFunction: () => void): void {
    const buttonElement = document.getElementById(id);
    if (buttonElement) {
      buttonElement.addEventListener('click', eventRespondFunction);
    }
  }

}

Lesson01.addFunction('butto11', Lesson01.log);
