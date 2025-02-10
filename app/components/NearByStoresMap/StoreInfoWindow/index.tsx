import React from "react"
import styles from "./styles.module.scss";
import { StoreSelling_items } from "~/api/lucktteryApi/types";
import Ico645 from "~/assets/ico_645.png";
import Ico720 from "~/assets/ico_720.png";
import IcoSpeetto from "~/assets/ico_speetto.png";

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

  if (sellingItems.sells_lotto) sellerIcons.push(Ico645);
  if (sellingItems.sells_annuity) sellerIcons.push(Ico720);
  if (
    sellingItems.sells_speeto_500 ||
    sellingItems.sells_speeto_1000 ||
    sellingItems.sells_speeto_2000
  ) {
    sellerIcons.push(IcoSpeetto);
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
          <img alt={`item-${index}`} src={icon} height={20} key={index} />
        ))}
      </div>
    </div>
  );
}

export default StoreInfoWindow;