/* Author: Andrew Lucieer
   Version: 1.0
   Date: June 4, 2015

*/

  // Makes a standard HTML table's tbody scrollable, lining up its headers
  (function( $ ) {
	$.fn.makeTableScrollable = function(divHeight, tableType) {

	  return this.each(function() {

		var $table = $(this);

		if (tableType == 2) {
			_moveLeftHeaders($table, divHeight);
			_finalizeDualScrollTable($table);
		}

	   _setCellWidths($table);
		_moveTHEAD($table);

		// Make TBODY scrollable:
		var $tbodyDiv = $table.parent('.scrollTbodyDiv');
		$tbodyDiv.css('height', divHeight);
	  });

	  function _setCellWidths(table) { // Private Function
		var $table = table;
		var tableId = $table.attr('id');
		// Set width for table:
		$table.css('width', $table.width());

		// Set width for TH cells:
		var $THs = $('#'+ tableId + ' thead tr:first th');
		var $THRow = $('#'+ tableId + ' thead tr:first').clone().html('');

		$THs.each(function() {
		  var $clonedTh = $(this).clone();
		  $clonedTh.width($(this).innerWidth());
		  $THRow.append($clonedTh);
		});

		//Add fixed-width TH Row:
		$('#' + tableId + ' tr:first').html($THRow.html());

		// Set width for TD cells:
		var $firstTDs = $('#'+ tableId + ' tbody tr:first td');
		var tdString = "";
		$firstTDs.each(function() {
		  tdString += "<TD style='width:" + $(this).innerWidth() + "px;'>" + $(this).html() + '</TD>';
		});

		//Add fixed-width TD Row:
		$('#' + tableId + ' tbody tr:first').html(tdString);

		return table;
	  }

	  function _moveTHEAD(table) { // Private Function
		//Generate header table:
		var tableId = $(table).attr('id');
		var $headerTable = $("<div class='topHeaderDiv'><table id='" + tableId + "' class='scrollableHeaderTable' /></div>");

		//Assign tableId to headerTable:
		$headerTable.append($('#' + tableId + ' thead'));

		$headerTable
			.attr('id', tableId + 'Header')
			.attr('cellspacing', $(table).attr('cellspacing'))
			.attr('cellpadding', $(table).attr('cellpadding'));

		//Prepend new detached headerTable before dataTable
		$headerTable.insertBefore($(table).parent('div'));

		return table;
	  }

	  function _moveLeftHeaders(table, rightDivHeight) { // Private Function
		//Some th cells (like the blank top left one) aren't used, so remove them:
		$('th.remove').remove();

		$('.leftHeaderDiv').css('max-height', rightDivHeight - 16);

		//Append detached left headers into leftHeaderDiv
		var tableId = $(table).attr('id');
		$('.leftHeaderDiv table').append($('#' + tableId + ' tbody th'));

		//Line up left headers with tbody data:
		var margin = $('#' + tableId + ' thead').height();
		$('.leftHeaderDiv').css('margin-top', margin);

		return table;
	  }
	  
	  function _finalizeDualScrollTable(table) {
		//Synchronize horizontal/vertical scrolling between headers and data
		$('.scrollTbodyDiv').on('scroll', function () {
			$('.leftHeaderDiv').scrollTop($(this).scrollTop());
			$('.topHeaderDiv').scrollLeft($(this).scrollLeft());
		});
	  }
	}
  })( jQuery );
