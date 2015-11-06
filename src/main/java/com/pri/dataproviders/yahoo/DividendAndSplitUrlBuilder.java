package com.pri.dataproviders.yahoo;

import java.util.Calendar;
import java.util.GregorianCalendar;

/**
 *
 * @author Mikolaj Manski
 */
public class DividendAndSplitUrlBuilder extends AbstractYahooUrlBuilder {

	private static final String URL_PATTERN = 
			"http://ichart.finance.yahoo.com/table.csv?s=&s&a=%s&b=&s&c=&s&d=&s&e=&s&f=%s&g=d&ignore=.csv";

	private final Calendar startPoint;

	private final Calendar endPoint;

	public DividendAndSplitUrlBuilder() {
		startPoint = new GregorianCalendar();
		endPoint = new GregorianCalendar();
	}

	@Override
	public String build() {
		startPoint.setTime(startDate);
		endPoint.setTime(endDate);

		return String.format(
		//@formatter:off
			URL_PATTERN,
			//plurality tbd
			quoteSymbol,
			Integer.toString(startPoint.get(Calendar.MONTH)),
			Integer.toString(startPoint.get(Calendar.DAY_OF_MONTH)),
			Integer.toString(startPoint.get(Calendar.YEAR)),
			Integer.toString(endPoint.get(Calendar.MONTH)),
			Integer.toString(endPoint.get(Calendar.DAY_OF_MONTH)),
			Integer.toString(endPoint.get(Calendar.YEAR))
		);
		//@formatter:on
	}

}
