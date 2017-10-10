/*
Created by Freshek on 07.10.2017
*/

class HandlersManager {
  static register(e, h) {
    $(document).on(e, h.handler);
  }
}
