export class FavBusiness {

  id: number;
  // tslint:disable-next-line:variable-name
  address_id: number;
  alias: string;
  // tslint:disable-next-line:variable-name
  image_url: string;
  // tslint:disable-next-line:variable-name
  is_closed: boolean;
  name: string;

  // tslint:disable-next-line:variable-name
  constructor(id: number, address_id: number, alias: string, image_url: string, is_closed: boolean, name: string, phone: string, rating: number, review_count: number, url: string) {
    this.id = id;
    this.address_id = address_id;
    this.alias = alias;
    this.image_url = image_url;
    this.is_closed = is_closed;
    this.name = name;
    this.phone = phone;
    this.rating = rating;
    this.review_count = review_count;
    this.url = url;
  }

  phone: string;
  rating: number;
  // tslint:disable-next-line:variable-name
  review_count: number;
  url: string;

}
