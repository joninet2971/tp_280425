import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export const exportToPdf = (data, title, columns) => {
    const doc = new jsPDF()

    doc.text(`Listado de ${title}`, 14, 10)
    
    autoTable(doc, {
        head: [columns],
        body: data,
        startY: 20
    })

    doc.save(`${title}.pdf`)
}