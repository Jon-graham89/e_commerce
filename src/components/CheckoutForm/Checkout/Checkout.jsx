import React, { useState, useEffect } from "react";
import {
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
	CircularProgress,
	Divider,
	Button,
	CssBaseline,
} from "@material-ui/core";
import useStyles from "./Styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from "../../../lib/commerce";
import { Link, useHistory } from "react-router-dom";

const Checkout = ({
	cart,
	order,
	handleCaptureCheckout,
	error,
	refreshCart,
}) => {
	const classes = useStyles();
	const steps = ["Shipping Address", "Payment Details"];
	const history = useHistory();

	const [activeStep, setActiveStep] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [shippingData, setShippingData] = useState({});

	const Form = () =>
		activeStep === 0 ? (
			<AddressForm checkoutToken={checkoutToken} next={next} />
		) : (
			<PaymentForm
				checkoutToken={checkoutToken}
				shippingData={shippingData}
				backStep={backStep}
				nextStep={nextStep}
				handleCaptureCheckout={handleCaptureCheckout}
			/>
		);

	let Confirmation = () =>
		order.customer ? (
			<>
				<div>
					<Typography variant="h5">
						Thank you for your purchase, {order.customer.firstname}{" "}
						{order.customer.lastname}
					</Typography>
					<Divider className={classes.divider} />
					<Typography variant="subtitle2">
						Order ref: {order.customer.customer_reference}
					</Typography>
				</div>

				<br />
				<Button component={Link} to="/" variant="outlined" type="button">
					Back to Home
				</Button>
			</>
		) : (
			<div className={classes.spinner}>
				<CircularProgress />
			</div>
		);

	if (error) {
		<>
			<Typography variant="h5">Error: {error}</Typography>
			<br />
			<Button component={Link} to="/" variant="outlined" type="button">
				Back to Home
			</Button>
		</>;
	}

	useEffect(() => {
		const generateToken = async () => {
			try {
				const token = await commerce.checkout.generateToken(cart.id, {
					type: "cart",
				});
				setCheckoutToken(token);
			} catch (error) {
				history.pushState("/");
			}
		};
		generateToken();
	}, [cart]);

	const nextStep = () => {
		setActiveStep((previousActiveStep) => previousActiveStep + 1);
	};

	const backStep = () => {
		setActiveStep((previousActiveStep) => previousActiveStep - 1);
	};

	const next = (data) => {
		setShippingData(data);
		nextStep();
	};

	return (
		<>
			<CssBaseline />
			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography variant="h4" align="center">
						Checkout
					</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map((step) => (
							<Step key={step}>
								<StepLabel>{step}</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length ? (
						<Confirmation />
					) : (
						checkoutToken && <Form />
					)}
				</Paper>
			</main>
		</>
	);
};

export default Checkout;
