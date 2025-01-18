import React from "react"
import styles from "./styles.module.scss";
import { StoreSelling_items } from "~/api/lucktteryApi/types";
import IcoSeller645 from "~/assets/ico_seller_645.png";
import IcoSeller720 from "~/assets/ico_seller_720.png";
import IcoSellerSpeetto from "~/assets/ico_seller_speetto.png";

type StoreInfoWindowProps = {
  name: string
  address: string
  sellingItems: StoreSelling_items
};

export const StoreInfoWindow: React.FC<StoreInfoWindowProps> = ({ name, address, sellingItems }: StoreInfoWindowProps) => {
  const decodeHTMLEntities = (text: string) => {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(text, "text/html").documentElement.textContent;
    return decodedString;
  }

  const sellerIcons: string[] = []

  if (sellingItems.sells_lotto) sellerIcons.push(IcoSeller645);
  if (sellingItems.sells_annuity) sellerIcons.push(IcoSeller720);
  if (
    sellingItems.sells_speeto_500 ||
    sellingItems.sells_speeto_1000 ||
    sellingItems.sells_speeto_2000
  ) {
    sellerIcons.push(IcoSellerSpeetto);
  }

  return (
    <div className={styles.storeInfoWindow}>
      <div className={styles.name}>
        {decodeHTMLEntities(name)}
      </div>
      <div className={styles.address}>
        {decodeHTMLEntities(address)}
      </div>
      <div>
        {sellerIcons.map((icon, index) => (
          <img alt={`item-${index}`} src={icon} key={index} />
        ))}
      </div>
    </div>
  );
}

export default StoreInfoWindow;