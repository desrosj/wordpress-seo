import KeyphraseLengthAssessment from "../../../../src/scoring/assessments/seo/KeyphraseLengthAssessment";
import Paper from "../../../../src/values/Paper.js";
import factory from "../../../specHelpers/factory.js";
import keyphraseLengthConfig from "../../../../src/languageProcessing/languages/de/config/keyphraseLength";
const i18n = factory.buildJed();
import { all as englishFunctionWords } from "../../../../src/languageProcessing/languages/en/config/functionWords";
import { all as germanFunctionWords } from "../../../../src/languageProcessing/languages/de/config/functionWords";
describe( "the keyphrase length assessment", function() {
	it( "should assess a custom paper with one-word keyphrase as bad ", function() {
		const paper = new Paper();
		const researcher = factory.buildMockResearcher( { keyphraseLength: 1, functionWords: englishFunctionWords } );
		const result = new KeyphraseLengthAssessment( {
			parameters: {
				recommendedMinimum: 4,
				recommendedMaximum: 6,
				acceptableMaximum: 8,
				acceptableMinimum: 1,
			},
		}, true ).getResult( paper, researcher, i18n );
		expect( result.getScore() ).toEqual( 3 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: " +
			"The keyphrase is 1 word long. That's shorter than the recommended minimum of 4 words. " +
			"<a href='https://yoa.st/33j' target='_blank'>Make it longer</a>!" );
	} );
	it( "should assess a custom paper with a slightly too short keyphrase as okay ", function() {
		const paper = new Paper();
		const researcher = factory.buildMockResearcher( { keyphraseLength: 3, functionWords: englishFunctionWords } );

		const result = new KeyphraseLengthAssessment( {
			parameters: {
				recommendedMinimum: 4,
				recommendedMaximum: 6,
				acceptableMaximum: 8,
				acceptableMinimum: 1,
			},
		}, true ).getResult( paper, researcher, i18n );
		expect( result.getScore() ).toEqual( 6 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: " +
			"The keyphrase is 3 words long. That's slightly shorter than the recommended minimum of 4 words. " +
			"<a href='https://yoa.st/33j' target='_blank'>Make it longer</a>!" );
	} );

	it( "should assess a paper with a keyphrase that's the correct length", function() {
		const paper = new Paper( "", { keyword: "keyword" } );
		const researcher = factory.buildMockResearcher( { keyphraseLength: 4, functionWords: englishFunctionWords } );
		const result = new KeyphraseLengthAssessment( {
			parameters: {
				recommendedMinimum: 4,
				recommendedMaximum: 6,
				acceptableMaximum: 8,
				acceptableMinimum: 1,
			},
		}, true ).getResult( paper, researcher, i18n );
		expect( result.getScore() ).toEqual( 9 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: Good job!" );
	} );

	it( "should assess a custom paper with a keyphrase that's slightly too long as okay", function() {
		const paper = new Paper( "", { keyword: "keyword" } );
		const researcher = factory.buildMockResearcher( { keyphraseLength: 7, functionWords: englishFunctionWords } );

		const result = new KeyphraseLengthAssessment( {
			parameters: {
				recommendedMinimum: 4,
				recommendedMaximum: 6,
				acceptableMaximum: 8,
				acceptableMinimum: 1,
			},
		}, true ).getResult( paper, researcher, i18n );
		expect( result.getScore() ).toEqual( 6 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: " +
			"The keyphrase is 7 words long. That's longer than the recommended maximum of 6 words. " +
			"<a href='https://yoa.st/33j' target='_blank'>Make it shorter</a>!" );
	} );
	it( "should assess a custom paper with a keyphrase that's too long as bad", function() {
		const paper = new Paper( "", { keyword: "keyword" } );
		const researcher = factory.buildMockResearcher( { keyphraseLength: 9, functionWords: englishFunctionWords } );

		const result = new KeyphraseLengthAssessment( {
			parameters: {
				recommendedMinimum: 4,
				recommendedMaximum: 6,
				acceptableMaximum: 8,
				acceptableMinimum: 1,
			},
		}, true ).getResult( paper, researcher, i18n );
		expect( result.getScore() ).toEqual( 3 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: " +
			"The keyphrase is 9 words long. That's longer than the recommended maximum of 6 words. " +
			"<a href='https://yoa.st/33j' target='_blank'>Make it shorter</a>!" );
	} );
} );
describe( "the keyphrase length assessment", function() {
	it( "should assess a language-specific custom paper with one-word keyphrase as bad ", function() {
		const paper = new Paper();
		const researcher = factory.buildMockResearcher( { keyphraseLength: 1, functionWords: germanFunctionWords }, false,
			true, keyphraseLengthConfig );

		const result = new KeyphraseLengthAssessment( {
			parameters: {
				recommendedMinimum: 3,
				recommendedMaximum: 6,
				acceptableMaximum: 7,
				acceptableMinimum: 1,
			},
		}, true ).getResult( paper, researcher, i18n );
		expect( result.getScore() ).toEqual( 3 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: " +
			"The keyphrase is 1 word long. That's shorter than the recommended minimum of 3 words. " +
			"<a href='https://yoa.st/33j' target='_blank'>Make it longer</a>!" );
	} );
	it( "should assess a custom paper with a slightly too short keyphrase as okay ", function() {
		const paper = new Paper();
		const researcher = factory.buildMockResearcher( { keyphraseLength: 2, functionWords: germanFunctionWords } );

		const result = new KeyphraseLengthAssessment( {
			parameters: {
				recommendedMinimum: 3,
				recommendedMaximum: 6,
				acceptableMaximum: 7,
				acceptableMinimum: 1,
			},
		}, true ).getResult( paper, researcher, i18n );
		expect( result.getScore() ).toEqual( 6 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: " +
			"The keyphrase is 2 words long. That's slightly shorter than the recommended minimum of 3 words. " +
			"<a href='https://yoa.st/33j' target='_blank'>Make it longer</a>!" );
	} );
	it( "should assess a paper with a keyphrase that's the correct length", function() {
		const paper = new Paper( "", { keyword: "keyword" } );
		const researcher = factory.buildMockResearcher( { keyphraseLength: 3, functionWords: germanFunctionWords } );
		const result = new KeyphraseLengthAssessment( {
			parameters: {
				recommendedMinimum: 3,
				recommendedMaximum: 6,
				acceptableMaximum: 7,
				acceptableMinimum: 1,
			},
		}, true ).getResult( paper, researcher, i18n );
		expect( result.getScore() ).toEqual( 9 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: Good job!" );
	} );
	it( "should assess a custom paper with a keyphrase that's slightly too long as okay", function() {
		const paper = new Paper( "", { keyword: "keyword" } );
		const researcher = factory.buildMockResearcher( { keyphraseLength: 7, functionWords: germanFunctionWords } );

		const result = new KeyphraseLengthAssessment( {
			parameters: {
				recommendedMinimum: 3,
				recommendedMaximum: 6,
				acceptableMaximum: 7,
				acceptableMinimum: 1,
			},
		}, true ).getResult( paper, researcher, i18n );
		expect( result.getScore() ).toEqual( 6 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: " +
			"The keyphrase is 7 words long. That's longer than the recommended maximum of 6 words. " +
			"<a href='https://yoa.st/33j' target='_blank'>Make it shorter</a>!" );
	} );
	it( "should assess a custom paper with a keyphrase that's too long as bad", function() {
		const paper = new Paper( "", { keyword: "keyword" } );
		const researcher = factory.buildMockResearcher( { keyphraseLength: 9, functionWords: germanFunctionWords } );

		const result = new KeyphraseLengthAssessment( {
			parameters: {
				recommendedMinimum: 3,
				recommendedMaximum: 6,
				acceptableMaximum: 7,
				acceptableMinimum: 1,
			},
		}, true ).getResult( paper, researcher, i18n );
		expect( result.getScore() ).toEqual( 3 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: " +
			"The keyphrase is 9 words long. That's longer than the recommended maximum of 6 words. " +
			"<a href='https://yoa.st/33j' target='_blank'>Make it shorter</a>!" );
	} );
} );

describe( "the keyphrase length assessment", function() {
	it( "should assess a paper without a keyword as extremely bad", function() {
		const paper = new Paper();
		const researcher = factory.buildMockResearcher( { keyphraseLength: 0, functionWords: [] } );

		const result = new KeyphraseLengthAssessment().getResult( paper, researcher, i18n );

		expect( result.getScore() ).toEqual( -999 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: " +
			"No focus keyphrase was set for this page. " +
			"<a href='https://yoa.st/33j' target='_blank'>Set a keyphrase in order to calculate your SEO score</a>." );
	} );
	it( "should assess a paper without a keyword as extremely bad", function() {
		const paper = new Paper();
		const researcher = factory.buildMockResearcher( { keyphraseLength: 0, functionWords: englishFunctionWords } );

		const result = new KeyphraseLengthAssessment().getResult( paper, researcher, i18n );

		expect( result.getScore() ).toEqual( -999 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: " +
			"No focus keyphrase was set for this page. " +
			"<a href='https://yoa.st/33j' target='_blank'>Set a keyphrase in order to calculate your SEO score</a>." );
	} );

	it( "should show a different feedback text when no keyphrase is set for a related keyphrase", function() {
		const paper = new Paper();
		const researcher = factory.buildMockResearcher( { keyphraseLength: 0, functionWords: englishFunctionWords } );

		const result = new KeyphraseLengthAssessment( { isRelatedKeyphrase: true } ).getResult( paper, researcher, i18n );

		expect( result.getScore() ).toEqual( -999 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: " +
			"<a href='https://yoa.st/33j' target='_blank'>Set a keyphrase in order to calculate your SEO score</a>." );
	} );

	it( "should assess a paper with a keyphrase that's too long as bad", function() {
		const paper = new Paper( "", { keyword: "keyword" } );
		const researcher = factory.buildMockResearcher( { keyphraseLength: 11, functionWords: englishFunctionWords } );

		const result = new KeyphraseLengthAssessment().getResult( paper, researcher, i18n );

		expect( result.getScore() ).toEqual( 3 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: " +
			"The keyphrase is 11 words long. That's way more than the recommended maximum of 4 words. " +
			"<a href='https://yoa.st/33j' target='_blank'>Make it shorter</a>!" );
	} );

	it( "should assess a paper with a keyphrase that's the correct length", function() {
		const paper = new Paper( "", { keyword: "keyword" } );
		const researcher = factory.buildMockResearcher( { keyphraseLength: 3, functionWords: englishFunctionWords } );

		const result = new KeyphraseLengthAssessment().getResult( paper, researcher, i18n );

		expect( result.getScore() ).toEqual( 9 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: Good job!" );
	} );

	it( "should assess a paper with a keyphrase that's a little longer than the correct length", function() {
		const paper = new Paper( "", { keyword: "keyword keyword keyword keyword keyword" } );
		const researcher = factory.buildMockResearcher( { keyphraseLength: 5, functionWords: englishFunctionWords } );

		const result = new KeyphraseLengthAssessment().getResult( paper, researcher, i18n );

		expect( result.getScore() ).toEqual( 6 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: " +
			"The keyphrase is 5 words long. That's more than the recommended maximum of 4 words. " +
			"<a href='https://yoa.st/33j' target='_blank'>Make it shorter</a>!" );
	} );

	it( "should assess a paper with an 6-word keyphrase as good for a language that doesn't support function words", function() {
		const paper = new Paper( "", { keyword: "1 2 3 4 5 6" } );
		const researcher = factory.buildMockResearcher( { keyphraseLength: 5, functionWords: [] } );

		const result = new KeyphraseLengthAssessment().getResult( paper, researcher, i18n );

		expect( result.getScore() ).toEqual( 9 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: Good job!" );
	} );
	it( "should assess a paper with an 9-word keyphrase as okay for a language that doesn't support function words", function() {
		const paper = new Paper( "", { keyword: "1 2 3 4 5 6 7 8 9" } );
		const researcher = factory.buildMockResearcher( { keyphraseLength: 9, functionWords: [] } );

		const result = new KeyphraseLengthAssessment().getResult( paper, researcher, i18n );

		expect( result.getScore() ).toEqual( 6 );
		expect( result.getText() ).toEqual( "<a href='https://yoa.st/33i' target='_blank'>Keyphrase length</a>: " +
			"The keyphrase is 9 words long. That's more than the recommended maximum of 6 words. " +
			"<a href='https://yoa.st/33j' target='_blank'>Make it shorter</a>!" );
	} );
} );
