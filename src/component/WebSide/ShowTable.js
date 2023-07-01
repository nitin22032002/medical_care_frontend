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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

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
    const handleChange=(value)=>{
        context.setColumnList(value.target.value);
    }
    const handleRender=(selected)=>{
      console.log(selected)
      let arr=selected.map((item)=>{
        return props.columns[item].label
      })
      return arr.join(',')
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
                            <TableCell align="right" colSpan={5}>
                            <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Select Columns</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={context.getColumnsList}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={handleRender}
          // MenuProps={MenuProps}
        >
          {props.columns.map((name,index) => (
            <MenuItem key={name} value={index}>
              <Checkbox checked={context.getColumnsList.includes(index)} />
              <ListItemText primary={name.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
                            {columns.filter((item,index)=>{return context.getColumnsList.includes(index)}).map((column) => (
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
                                        {columns.filter((item,index)=>{return context.getColumnsList.includes(index)}).map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {
                                                        typeof(value)=="string" ? value :
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