import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shipmentcompany'
})
export class ShipmentcompanyPipe implements PipeTransform {

  transform(shipmentarr: any, shipfil_name?: any): any {
    if( shipfil_name === undefined) return shipmentarr;

    return shipmentarr.filter(function (Shipmentarr)
    {
      return Shipmentarr.SC_Company_Name.toLowerCase().includes(shipfil_name.toLocaleLowerCase())|| Shipmentarr.SC_Company_URL.toLowerCase().includes(shipfil_name.toLocaleLowerCase());


    })
  }

}
