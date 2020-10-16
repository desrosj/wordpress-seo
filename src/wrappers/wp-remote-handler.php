<?php

namespace Yoast\WP\SEO\Wrappers;

use YoastSEO_Vendor\GuzzleHttp\Promise\FulfilledPromise;
use YoastSEO_Vendor\GuzzleHttp\Promise\PromiseInterface;
use YoastSEO_Vendor\GuzzleHttp\Psr7\Response;
use YoastSEO_Vendor\Psr\Http\Message\RequestInterface;

/**
 * Wraps wp_remote_get in an interface compatible with Guzzle.
 */
class WP_Remote_Handler {

	/**
	 * Calls the handler.
	 *
	 * @param RequestInterface $request The request.
	 * @param array            $options The request options.
	 *
	 * @return PromiseInterface The promise interface.
	 */
	public function __invoke( RequestInterface $request, array $options ) {
		$headers = [];
		foreach ( $request->getHeaders() as $name => $values ) {
			$headers[ $name ] = \implode( ',', $values );
		}

		$args = [
			'method'      => $request->getMethod(),
			'headers'     => $headers,
			'body'        => (string) $request->getBody(),
			'httpVersion' => $request->getProtocolVersion(),
		];

		if ( isset( $options['verify'] ) && $options['verify'] === false ) {
			$args['sslverify'] = false;
		}

		$raw_response = \wp_remote_request( $request->getUri(), $args );
		if ( \is_wp_error( $raw_response ) ) {
			throw new \Exception( $raw_response->get_error_message(), $raw_response->get_error_code() );
		}

		$response = new Response(
			$raw_response['response']['code'],
			$raw_response['headers']->getAll(),
			$raw_response['body'],
			$args['httpVersion'],
			$raw_response['response']['message']
		);

		return new FulfilledPromise( $response );
	}
}
