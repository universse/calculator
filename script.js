$(function() {
  var output = '';
  var result,
      ans = 0;
  
  $('button.number').click(function() {
    checkAns();
    output += $(this).html();
    checkOutput(output);
    calculate();
  });
  
  $('button.func').click(function() {
    ans = 0;
    if (isNaN(output.slice(-1))) {
      output = output.slice(0, -1) + $(this).html();
    } else {
      output += $(this).html();
    }
    checkOutput(output);
  });
  
  $('#dot').click(function() {
    checkAns();
    if (output.slice(-1) !== '.') {
      output += $(this).val();
    }
    checkOutput(output);
    $(this).val('');
  });
  
  $('#enter').click(function() {
    $('#output, #temp-result').empty();
    $('#output').html(result);
    if (result === 'error') {
      output = '';
      result = 0;
    } else {
      output = result;
      ans = result;
      $('#delete').prop('disabled', true);
    }
  });
  
  $('#clear').click(function() {
    $('#output, #temp-result').empty();
    output = '';
    result = 0;
  });
  
  $('#delete').click(function() {
    if (output.slice(-1) === '.') {
      $('#dot').val('.');
    }
    output = output.slice(0, -1);
    checkOutput(output);
    $('#temp-result').html('');
    if (!isNaN(eval(output.slice(-1)))) {
      calculate();
    }   
  });
  
  $('button').not('#enter').click(function() {
    $('#delete').prop('disabled', false);
  });
  
  $('button.func, #enter, #clear').click(function() {
    $('#dot').val('.');
  })
  
  function checkOutput(str) {
    if (str.length <= 9) {
      $('#output').html(str);
    } else {
      $('#output').html('...' + str.slice(-8));
    }
  }
  
  function checkAns() {
    if (ans || ans === undefined) {
      output = '';
      ans = 0;
    }
  }
  
  function calculate() {
    var properOutput = output.replace(/×/g, '*').replace(/÷/g, '/');
    if (properOutput.indexOf('*') === 0 || properOutput.indexOf('/') === 0) {
      result = 'error';
    } else {
      result = eval(properOutput) + '';
    }
    if (eval(result) > 999999999) {
      result = 'error';
    } else if (result.indexOf('.') !== -1 && result.length > 9) {  
      result = Math.round(result * 10000000) / 10000000;
    }
    $('#temp-result').html(result);
  };
  
});