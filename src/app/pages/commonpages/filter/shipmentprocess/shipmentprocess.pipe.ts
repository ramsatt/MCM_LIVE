import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shipmentprocess'
})
export class ShipmentprocessPipe implements PipeTransform {

  transform(shipmentarr: any, shipfil_name?: any): any {
    if( shipfil_name === undefined) return shipmentarr;

    return shipmentarr.filter(function (shipmentarr)
    {
      return shipmentarr.BM_Branch_Name.toLowerCase().includes(shipfil_name.toLocaleLowerCase());

    })
  }

}
