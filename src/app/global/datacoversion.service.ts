import {Injectable} from '@angular/core';

@Injectable()
export class DatacoversionService {

    constructor() {
    }

    padLeft(text: string, padChar: string, size: number): string {
        return (String(padChar).repeat(size) + text).substr((size * -1), size);
    }

    TimeDifference(StartTime: any, EndTime: any) {
        const NewStartTime = this.parseTime(StartTime);
        const NewEndTime = this.parseTime(EndTime);
        /*check hour*/
        if (NewStartTime.hh === NewEndTime.hh) {
            if (NewStartTime.mm < NewEndTime.mm) {
                return true;
            } else {
                return false;
            }
        } else if (NewStartTime.hh < NewEndTime.hh) {
            return true;
        } else {
            return false;
        }
    }

    parseTime(s) {
        const part = s.match(/(\d+):(\d+)(?: )?(am|pm)?/i);
        let hh = parseInt(part[1], 10);
        const mm = parseInt(part[2], 10);
        const ap = part[3] ? part[3].toUpperCase() : null;
        if (ap === 'AM') {
            if (hh === 12) {
                hh = 0;
            }
        }
        if (ap === 'PM') {
            if (hh !== 12) {
                hh += 12;
            }
        }
        return {hh: hh, mm: mm};
    }
}
