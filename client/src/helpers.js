import React from 'react';
import jsPDF from 'jspdf';
import XLSX from 'xlsx';
import FileSaver from 'file-saver';

export const pad = (number, digit = 6) => {
    const paddedNumber = ('0'.repeat(digit) + number).slice((digit * -1));

    return paddedNumber;
};

export const formatNumber = (number) => {
    const formattedNumber = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    return formattedNumber;
};

export const unformatNumber = (number) => {
    let unformattedNumber = parseInt(number.split('.').join(''));

    if(isNaN(unformattedNumber)) {
        unformattedNumber = 0;
    }

    return unformattedNumber;
};

export const getId = (id) => {
    const paddedId = pad(id);
    
    return (
        <div className="d-inline-flex p-1 px-2 bg-light text-muted border rounded-3">
            {paddedId}
        </div>
    );
};

export const getBill = (bill) => {
    if (bill === 0) {
        // return (<span className="badge badge-danger small p-2 rounded-3">Belum Ditagih</span>);
        // return (
        //     <div class="alert alert-danger d-inline-flex py-1 px-2 small rounded-3 mb-0">
        //         Rp. 0
        //     </div>
        // );
        return (
            <span className="text-danger font-weight-bold">
                Rp. 0
            </span>
        )
    } else {
        return (
            <span>
                {'Rp. ' + formatNumber(bill)}
            </span>
        );
    }
};

export const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const translateProperty = (property, tableName = '') => {
    switch (property) {
        case 'id':
            switch (tableName) {
                case 'checkups':
                    return 'No. RM';
                default:
                    return 'No.';
            }
        case 'nik':
            return 'NIK';
        case 'name':
            switch (tableName) {
                case 'patients' || 'doctors':
                    return 'Nama Lengkap';
                default:
                    return 'Nama';
            }
        case 'email':
            switch (tableName) {
                case 'users':
                    return 'Email / Nama Pengguna';
                default:
                    return 'Email';
            }
        case 'role':
            return 'Akses';
        case 'birth_date':
            return 'Tgl. Lahir';
        case 'address':
            return 'Alamat';
        case 'province':
            return 'Provinsi';
        case 'city':
            return 'Kota / Kabupaten';
        case 'district':
            return 'Kecamatan';
        case 'subdistrict':
                return 'Kelurahan';
        case 'rw':
            return 'RW';
        case 'rt':
            return 'RT';
        case 'religion':
            return 'Agama';
        case 'education':
            return 'Pendidikan';
        case 'profession':
            return 'Pekerjaan';
        case 'type':
            switch (tableName) {
                case 'patients':
                    return 'Jenis Pasien';
                case 'checkups':
                    return 'Jenis Pemeriksaan';
                default:
                    return 'Jenis';
            }
        case 'created_at':
            switch (tableName) {
                case 'patients':
                    return 'Tanggal Pendaftaran';
                case 'checkups':
                    return 'Tanggal Pencatatan';
                default:
                    return 'Tanggal Pendaftaran';
            }
        case 'patient_name':
            return 'Nama Pasien';
        case 'doctor_name':
            return 'Nama Dokter';
        case 'room_name':
            return 'Nama Kamar';
        case 'bill':
            return 'Tagihan Pembayaran';
        default:
            return property.charAt(0).toUpperCase() + property.slice(1);
    }
};

export const translateTableName = (tableName) => {
    switch (tableName) {
        case 'patients':
            return 'Pasien';
        case 'doctors':
            return 'Dokter';
        case 'rooms':
            return 'Kamar';
        case 'checkups':
            return 'Pemeriksaan';
        case 'users':
            return 'Pengguna';
        default:
            return '???';
    }
};

export const translateRole = (role) => {
    switch (role) {
        case 'admin':
            return 'Admin';
        case 'cashier':
            return 'Kasir';
        case 'registrar':
            return 'Registrar';
        default:
            return '???';
    }
};

export const translateGender = (gender) => {
    switch (gender) {
        case 'male':
            return 'Pria';
        case 'female':
            return 'Wanita';
        default:
            return '???';
    }
}

export const downloadPdf = (data, tableName) => {
    const getWidth = (property) => {
        switch (property) {
            case 'id':
                return 16;
            case 'nik':
                return 31;
            case 'birth_date':
                return 20;
            case 'gender':
                return 16;
            case 'address':
                return 75;   
            case 'rw':
                return 11;
            case 'rt':
                return 11;
            case 'religion':
                return 23;
            case 'education':
                return 21;
            case 'bill':
                return 34;
            case 'created_at':
                return 34;
            default:
                return 37;
        }
    };

    const x = 10;
    const y = 10;
    let width = 37;
    let text = '???';
    const height = 8;

    let doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        fontSize: 8,
        lineHeight: 0.6,
        autoSize: false,
        printHeaders: true,
    });

    Object.keys(data[0]).map((property) => {
        doc.setFontType('bold');

        width = getWidth(property);
        text = translateProperty(property, tableName);

        doc.cell(x, y, width, height, text, 1);

        return false;
    });

    data.map((dataItem, key) => {
        Object.keys(dataItem).map((property) => {
            doc.setFontType('normal');

            width = getWidth(property);

            console.log(property);

            switch (property) {
                case 'id': 
                    text = pad(dataItem[property]);
                    break;
                case 'gender': 
                    text = translateGender(dataItem[property]);
                    break;
                case 'bill': 
                    text = `Rp. ${formatNumber(dataItem[property])}`;
                    break;
                case 'email': 
                    text = validateEmail(dataItem[property]) ? dataItem[property] : `@${dataItem[property]}`;
                    break;
                case 'role': 
                    text = translateRole(dataItem[property]);
                    break;
                default:
                    text = dataItem[property].toString();
                    break;
            }

            doc.cell(x, y, width, height, text, key + 2);

            return false;
        });

        return false;
    });

    // doc.output('dataurlnewwindow');
    doc.save(translateTableName(tableName));
};

export const downloadXlsx = (data, tableName) => {
    // Properties
    const properties = Object.keys(data[0]);
    let translatedProperties = [];

    properties.map((property) => {
        translatedProperties.push(translateProperty(property, tableName));

        return false;
    });

    let wb = XLSX.utils.book_new();

    wb.Props = {
      Title: translateTableName(tableName),
      Subject: translateTableName(tableName),
      CreatedDate: new Date(),
    };

    wb.SheetNames.push('Sheet 1');

    let ws_data = [];

    ws_data.push(translatedProperties);

    data.map((dataItem) => {
      let x = [];

      properties.map((property) => {
        let text = null;

        switch (property) {
            case 'id': 
                text = pad(dataItem[property]);
                break;
            case 'gender': 
                text = translateGender(dataItem[property]);
                break;
            case 'bill': 
                text = `Rp. ${formatNumber(dataItem[property])}`;
                break;
            case 'email': 
                text = validateEmail(dataItem[property]) ? dataItem[property] : `@${dataItem[property]}`;
                break;
            case 'role': 
                text = translateRole(dataItem[property]);
                break;
            default:
                text = dataItem[property];
                break;
        }

        x.push(text);

        return false;
      });

      ws_data.push(x);

      return false;
    })

    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    wb.Sheets['Sheet 1'] = ws;

    const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});

    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);

      for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
      }

      return buf;
    };

    FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream', }), `${translateTableName(tableName)}.xlsx`);
  };