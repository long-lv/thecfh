import DOMPurify from "dompurify";
export class TheCfhUtils {
  public static formatedPrice(price: string | number) {
    return price ? new Intl.NumberFormat("vi-Vn").format(Number(price)) : "-";
  };

  public static splitImages(images: string) {
    return images ? images.split(";") : ["-"];
  };

  public static formatedDate(date: string) {
    if (date) {
      const dateFormated = new Date(date);
      const d = dateFormated.getDate().toString().padStart(2, "0");
      const m = (dateFormated.getMonth() + 1).toString().padStart(2, "0");
      const y = dateFormated.getFullYear().toString().slice(-2);
      return `${d}/${m}/${y}`;
    }
    return "-";
  };

	public static convertPriceFormatToNumber(priceFormat: string) {
		return parseInt(priceFormat.replace(/\./g, ''));
	}

	public static renderHtmlToDom(content: string | undefined) {
		return content ? DOMPurify.sanitize(content) : "-";
	}
}