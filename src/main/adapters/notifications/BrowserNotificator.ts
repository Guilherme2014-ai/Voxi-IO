export class BrowserNotificator {
  async sendcontactMessageNotification(contactName: string) {
    if (await this.getPermission())
      console.log(
        new Notification("New Message", {
          body: `${contactName} sent you a message !`,
        }),
      );
  }

  async getPermission() {
    if (this.isPermissionGranted()) return "granted";
    if (await this.isRequestGranted()) return "granted";

    return "denied";
  }

  isPermissionGranted() {
    const permission = Notification.permission;
    return permission == "granted";
  }

  async isRequestGranted() {
    const permission = await Notification.requestPermission();

    return permission == "granted";
  }
}
