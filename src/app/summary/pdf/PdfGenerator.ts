import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export class PdfGenerator {
   
   
    generate(items, personData, totalToPaid) {
        let docDefinition = {
          content: [
            {
              text: 'Sklep zoologiczny',
              fontSize: 20,
              alignment: 'center',
              color: 'black'
            },
            {
              text: 'JAM',
              fontSize: 24,
              color: '#f25287',
              bold: true,
              alignment: 'center',
            },
            {
              text: `Data: ${new Date().toLocaleString()}`
    
            },
            {
              text: `Numer zamówienia : ${((Math.random() * 1000).toFixed(0))}`
    
            },
            {
              columns: [
                [
                  {
                    text: 'Nabywca',
                    style: 'sectionHeader'
                  },
                  {
                    text: personData.fName + " " + personData.lName,
                    bold: true
                  },
                  { text: personData.city },
                  { text: personData.adress },
                  { text: personData.country },
                  { text: "Nip: " + personData.nip },
                ],
                [
                  {
                    text: 'Sprzedawca',
                    style: 'sectionHeader',
                    alignment: 'right'
                  },
                  {
                    text: "Marcel Niedziela",
                    bold: true,
                    alignment: 'right'
                  },
                  {
                    text: "Sosnowiec",
                    alignment: 'right'
                  },
                  {
                    text: "Będzińska 39",
                    alignment: 'right'
                  },
                  {
                    text: "Polska",
                    alignment: 'right'
                  },
                  {
                    text: "Nip: 5643466743",
                    alignment: 'right'
                  }
                ]
              ]
            },
            {
              text: 'Szczegóły zamówienia',
              style: 'sectionHeader'
            },
            {
              table: {
                headerRows: 1,
                widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
                body: [
                  ['Produkt', 'Cena Netto', 'Stawka VAT', 'Kwota VAT', 'Ilość', 'Łącznie'],
                  ...items.map(item => ([item.nazwa, (item.cena * 0.77) + "zł", "23%", item.cena + "zł", item.iloscElementow, item.cenaLacznie + "zł"])),
                  [{ text: 'Łącznie', colSpan: 5 }, {}, {}, {}, {}, totalToPaid + "zł"]
                ]
              }
            },
            { text: ' ', },
            {
              table: {
                headerRows: 1,
                widths: [300],
                body: [
                  [''],
                  ['']
                ]
              },
              layout: 'headerLineOnly'
            },
            {
              text: 'Kwota do zapłaty: ' + totalToPaid + "zł",
              fontSize: 16
            },
            {
              table: {
                headerRows: 1,
                widths: [300],
                body: [
                  [''],
                  ['']
                ]
              },
              layout: 'headerLineOnly'
            },
            { text: ' ', },
            {
              ul: [
                'Zamówienie można zwrócić do 14 dni.',
                'Faktura wygenerowana automatycznie',
              ],
            }
          ],
          styles: {
            sectionHeader: {
              bold: true,
              decoration: 'underline',
              fontSize: 14,
              margin: [0, 15, 0, 15]
            }
          }
    
        };
    
    
    
    
    
    
        pdfMake.createPdf(docDefinition).open();
      }
  }