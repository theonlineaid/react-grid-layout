import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import Modal from 'react-modal'; // Ensure you have react-modal installed
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Define types for row data
interface ReportData {
    name: string;
    reportType: string; // You can customize the types as per your API
}

// Define the options for selecting the report category
type ReportCategory = 'OMS' | 'Back Office';

const Report: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<ReportCategory>('OMS');
    const [rowData, setRowData] = useState<ReportData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<ReportData | null>(null);
    const [formData, setFormData] = useState<{ name: string; reportType: string }>({ name: '', reportType: '' });

    // Define column definitions with type support
    const [columnDefs]: any = useState([
        { headerName: 'Report Name', field: 'name', sortable: true, filter: true },
    ]);

    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
        minWidth: 500,
        maxWidth: 600,
        enableCellChangeFlash: true,
        cellClass: 'align-right',
    };

    // Function to fetch data from API based on selectedOption
    const fetchData = async (option: ReportCategory) => {
        setLoading(true);
        try {
            let response;
            switch (option) {
                case 'OMS':
                    response = await axios.all([
                        axios.get('/api/orders/report_client_exec_by_ticker/?created_at=2024-06-23&trader_code=BENTRDR001&client_code=00006&ticker=DHAKAINS'),
                        axios.get('/api/orders/report_client_exec_by_ticker/?created_at=2024-06-23&trader_code=BENTRDR001'),
                        axios.get('/api/orders/report_for_client_executions/?effective_date=2024-06-24&trader_code=BENTRDR001'),
                        axios.get('/api/orders/report_client_exec_by_ticker/?effective_date=2024-06-24&trader_code=BENTRDR001'),
                    ]);
                    setRowData(response.map((res, idx) => ({
                        name: ['Client Execution By Ticker', 'Client Limit And Executions', 'Client Details And Executions', 'Ticker Details Executions'][idx],
                        ...res.data,
                    })));
                    break;

                case 'Back Office':
                    response = await axios.all([
                        axios.get('/api/back_office/get-report/?rpt_type=PortfolioRPT&invCode=02601&EODDate=2024-01-14'),
                        axios.get('/api/back_office/get-report/?rpt_type=TaxCertificateRPT&invCode=02601&FromDate=2023-06-01&ToDate=2023-12-31'),
                        axios.get('/api/back_office/get-report/?rpt_type=LedgerStatementRPT&invCode=02601&FromDate=2023-11-01&ToDate=2023-12-31'),
                        axios.get('/api/back_office/get-report/?rpt_type=ConfirmationNoteRPT&invCode=02601&FromDate=2023-06-01&ToDate=2023-12-31'),
                        axios.get('/api/back_office/get-report/?rpt_type=InstrumentCostingRPT&invCode=02601&EODDate=2023-12-14&insCode=AOL'),
                        axios.get('/api/back_office/get-report/?rpt_type=ProfitAndLossRPT&invCode=02601&FromDate=2023-11-01&ToDate=2023-12-31&insCode=AOL'),
                    ]);
                    setRowData(response.map((res, idx) => ({
                        name: ['Portfolio', 'Ledger Statement', 'Tax Certificate', 'Confirmation Note', 'Profit & Loss', 'Instrument Costing'][idx],
                        ...res.data,
                    })));
                    break;

                default:
                    setRowData([]);
                    break;
            }
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when the selected option changes
    useEffect(() => {
        fetchData(selectedOption);
    }, [selectedOption]);

    // Handle row click to open modal
    const onRowClicked = (event: any) => {
        setSelectedRow(event.data);
        setFormData({ name: event.data.name, reportType: event.data.reportType });
        setModalIsOpen(true);
    };

    // Handle modal form submission
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Perform your validation here and then close the modal
        // For now, just console log the form data
        console.log('Form submitted:', formData);
        setModalIsOpen(false);
    };

    return (
        <div>
            <label htmlFor="reportCategory">Select Report Category: </label>
            <select
                id="reportCategory"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value as ReportCategory)}
            >
                <option value="OMS">OMS</option>
                <option value="Back Office">Back Office</option>
            </select>

            <div className="ag-theme-alpine" style={{ height: 400, width: 600, marginTop: '20px' }}>
                {loading ? (
                    <p>Loading data...</p>
                ) : (
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        onRowClicked={onRowClicked} // Add onRowClicked event
                    />
                )}
            </div>

            {/* Modal for form validation */}
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">{selectedRow?.name}</h2>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Report Name:
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Report Type:
                            </label>
                            <input
                                type="text"
                                value={formData.reportType}
                                onChange={(e) => setFormData({ ...formData, reportType: e.target.value })}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={() => setModalIsOpen(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

        </div>
    );
};

export default Report;
