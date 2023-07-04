import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'json-2-csv';

  jsonContent = ''
  csvContent = ''

  invalidJson = true

  convert(){

        let csvBox = (<HTMLElement>document.getElementById('csv-box'))

        var array = typeof this.jsonContent != 'object' ? JSON.parse(this.jsonContent) : this.jsonContent;

        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';

            for (var index in array[i]) {
                line += array[i][index] + ',';
            }

            line.slice(0,line.length-1);

            str += line + '\r\n';
            this.csvContent = str


        }

        if(str === ''){
          this.invalidJson = false
        }
        return str

    }

    downloadCSV(){
      let value = this.convert();
      window.open( "data:text/csv;charset=utf-8," + encodeURIComponent(value))
    }

    copyCSV(csv: string){
      let btn = (<HTMLElement>document.getElementById('copyBtn'))
      btn.textContent = 'Copied!'
      navigator.clipboard.writeText(csv)
    }

    clearAll(){
      this.jsonContent = ''
      this.csvContent = ''
    }

    validation(){
      try {
        JSON.parse(this.jsonContent);
        this.invalidJson = true
      } catch{
        this.invalidJson = false
      }
    }
}

