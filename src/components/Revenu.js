import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import '../css/Layout.css';
export default function Revenu() {
    const [products, setProducts] = useState(null);
    const [date, setDate] = useState(null);
    const [dynamicColumns, setDynamicColumns] = useState([]);
    const baseColumns = [
        { field: 'id', header: 'ID' },
        { field: 'name', header: 'Nom du département' }
    ];
    
    const endColumns = [
        { field: 'soustotal', header: 'Sous Total' },
        { field: 'Comulation', header: 'Comulation' }
    ];
    const moveToPreviousTuesday = (date) => {
        while (date.getDay() !== 2) { // 2 représente mardi
            date.setDate(date.getDate() - 1);
        }
        return date;
    }
    
    const generateWeekColumns = (selectedDate) => {
        const days = ["mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
        let columns = [];
        const tuesday = moveToPreviousTuesday(new Date(selectedDate));
    
        for (let i = 0; i < 6; i++) {
            let currentDay = new Date(tuesday);
            currentDay.setDate(currentDay.getDate() + i);
            const formattedDate = `${days[i]} ${currentDay.getDate()}/${currentDay.getMonth() + 1}/${currentDay.getFullYear()}`;
            columns.push({ field: `day${i}`, header: formattedDate });
        }
        return columns;
    }
    
    const handleDateChange = (e) => {
        setDate(e.value);
        const newColumns = generateWeekColumns(e.value);
        setDynamicColumns(newColumns);
    }
    
    useEffect(() => {
      //  ProductService.getProductsMini().then((data) => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const isPositiveInteger = (val) => {
        let str = String(val);

        str = str.trim();

        if (!str) {
            return false;
        }

        str = str.replace(/^0+/, '') || '0';
        let n = Math.floor(Number(str));

        return n !== Infinity && String(n) === str && n >= 0;
    };

    const onCellEditComplete = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        switch (field) {
            case 'quantity':
            case 'price':
                if (isPositiveInteger(newValue)) rowData[field] = newValue;
                else event.preventDefault();
                break;

            default:
                if (newValue.trim().length > 0) rowData[field] = newValue;
                else event.preventDefault();
                break;
        }
    };

    const cellEditor = (options) => {
        if (options.field === 'price') return priceEditor(options);
        else return textEditor(options);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const priceEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" />;
    };

    const priceBodyTemplate = (rowData) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData.price);
    };

    return (
        <div className="card p-fluid">
            <h1>Saisire les données des revenus :</h1>
            <h3>Date debut de semaine:</h3>
            <div className="card flex justify-content-center">
                <Calendar value={date} onChange={handleDateChange} showIcon />
            </div>
    
            <DataTable value={products} editMode="cell" tableStyle={{ minWidth: '50rem' }}>
                {[...baseColumns, ...dynamicColumns, ...endColumns].map(({ field, header }) => {
                    return <Column key={field} field={field} header={header} style={{ width: '25%' }} />;
                })}
            </DataTable>

        </div>
    );
    
    
    
    
    
}
        