import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import "../css/table.css"
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ContextMain from '../../context/ContextMain';

export default function ShowTable(props) {
    const context=React.useContext(ContextMain)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [getData, setData] = React.useState([])
    const [getText, setText] = React.useState("")
    React.useEffect(() => {
        // console.log("hjs",context.getData)
        handleSearch()
    }, [context.getData])

    React.useEffect(() => {
        handleSearch()
    }, [getText])
    let columns = props.columns;
    const handleSearch = () => {
        let text = getText;
        if (text == "") {
            setData(context.getData);
        }
        else {
            let data = context.getData.filter((item) => {
                return (String(item[props.targetColumn]).startsWith(text))
            })
            setData(data);
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDelete=(row)=>{
            context.handleDelete(row);
    }
    // console.table(context.getData);
    return (
        (getData.length==0 || typeof(getData[0][props.targetColumn])=="string") && <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={2}>
                                <div class="search-bar">
                                    <div class="search-icon">
                                        <SearchIcon />
                                    </div>
                                    <input type="text" placeholder="Search" onChange={(event) => { setText(event.currentTarget.value) }} />
                                    <div class="logo">
                                        <img src="/url.png" alt="Website Logo" />
                                    </div>
                                </div>

                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                key="action"
                                align="center"
                                style={{ top: 57, minWidth: 50 }}
                            >
                                Action
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ top: 57, minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>

                                        <TableCell key="action" align="center" >
                                            <DeleteIcon style={{cursor:"pointer"}} onClick={()=>{handleDelete(row)}} />
                                        </TableCell>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {
                                                        column.id != props.list_column ? value :

                                                            value.map((item) => {
                                                                return (<div className='target-items'>{item}</div>)
                                                            })

                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={getData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}