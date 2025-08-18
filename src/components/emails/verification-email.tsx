import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { GalleryVerticalEnd } from "lucide-react";

interface VerificationEmailProps {
  username: string;
  url: string;
}

export default function VerificationEmail({
  username,
  url,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Your Smart Pharmacy Inventory Management System</Preview>
        <Container style={container}>
          <GalleryVerticalEnd />
          <Text style={paragraph}>Hi {username}</Text>
          <Text style={paragraph}>
            Welcome to PharmaFlow, your smart pharmacy inventory management
            system
          </Text>
          <Text style={paragraph}>
            Please verify your email address to continue setting up your account
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={url}>
              Verify your Email
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            The PharmaFlow team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>Addis Ababa, Ethiopia</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
