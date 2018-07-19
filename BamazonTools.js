var chalk = require('chalk');
var accounting = require('accounting');

var makeQuery = function(col) {
  var query = 'SELECT ';
  for (var i = 0; i < col.length; i++) {
    query += col[i].split(' ').join('') + ' AS "' + col[i] + '"';
    if (i !== col.length-1) {
      query += ', ';
    } else {
      query += ' ';
    }
  }
  query += 'FROM Products';
  return query;
};

var printData = function(res, col) {
  
  var colLengths = [];
  for (var h = 0; h < col.length; h++) {
    colLengths.push(col[h].split('').length);
  }
  
  for (var i = 0; i < res.length; i++) {
    
    for (var j = 0; j < col.length; j++) {
      var length;
      
      if (typeof res[i][col[j]] === 'number') {
        
        if (col[j] === 'Price' || col[j] === 'Overhead Costs' || col[j] === 'Product Sales' || col[j] === 'Total Profit') res[i][col[j]] = accounting.formatMoney(res[i][col[j]]);
        length = res[i][col[j]].toString().split('').length;
      } else {
        length = res[i][col[j]].split('').length;
      }
      
      if (colLengths[j] < length) colLengths[j] = length;
    }
  }
  
  for (var k = 0; k < res.length; k++) {
    var header = '| ';
    var divider = '+';
    var row = '| ';
    
    for (var l = 0; l < col.length; l++) {
      var spacerHeader = '';
      var spacer = '';
      for (var m = 0; m < colLengths[l]; m++) {
        
        if (m === 0) divider += '-';
        
        divider += '-';
        
        var length;
        if (typeof res[k][col[l]] === 'number') {
          length = res[k][col[l]].toString().split('').length;
        } else {
          length = res[k][col[l]].split('').length;
        }
        
        if (m >= col[l].split('').length && k === 0) spacerHeader += ' ';
        if (m >= length) spacer += ' ';
        
        if (m === colLengths[l] - 1) divider += '-+';
      }
      if (k === 0) {
        // Add header
        header += chalk.bold.cyan(col[l]);
        // Add header spacing, end and beginning of new one
        header += spacerHeader + ' | ';
      }
      
      row += chalk.yellow(res[k][col[l]]);
      
      row += spacer + ' | ';
    }
   
    if (k === 0) {
      console.log(chalk.bold.blue('\nCurrent Items on Sale\n'));
      console.log(divider);
      console.log(header);
      console.log(divider);
    }

    console.log(row);
    console.log(divider);
  }
  console.log('');
};

var validateQuantity = function(value) {
  if (value>=0 && value<=65535 && value%1===0 && value.indexOf(' ')<0 && value.indexOf('.')<0) {
    return true;
  } else {
    return 'Please type a whole number between 0 and 65535 without a period or extra spaces';
  }
}



exports.makeQuery = makeQuery;
exports.printData = printData;
exports.validateQuantity = validateQuantity;
