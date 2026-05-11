export async function validateTransferCode(
	transferCode: string,
	amount: number,
): Promise<{ ok: boolean; message: string }> {
	const normalizedCode = transferCode.trim();

	if (normalizedCode.length < 8) {
		return {
			ok: false,
			message: "Enter a longer transfer code to validate your key.",
		};
	}

	if (!/^[a-z0-9-]+$/i.test(normalizedCode)) {
		return {
			ok: false,
			message: "The code can only contain letters, numbers, and dashes.",
		};
	}

	return {
		ok: true,
		message: `Key accepted. You can unlock the ${amount}€ door.`,
	};
}
