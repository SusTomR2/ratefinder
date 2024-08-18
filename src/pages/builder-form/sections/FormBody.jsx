import { useState } from "react";
import {
  loanTypes,
  personTitles,
  streetTypes,
  streetDirections,
  provinces,
  counrties,
  occupationTypes,
  incomeTypes,
  otherInfoTypes,
} from "../../../constants";
import {
  Button,
  Choose,
  DateInput,
  TextArea,
  TextInput,
} from "../../../components";
import { plusIcon, renew } from "../../../assets/icons";
import { Stepper, Step, StepLabel, Box, Typography } from "@mui/material";
import React from 'react';

const FormBody = () => {
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    contactEmail: "",
    contactPhone: "",
    companyWebsite: "",
  });

  const [serviceInfo, setServiceInfo] = useState({
    loanType: -1,
    projectType: -1,
    projectCost: {
      hardCost: 0,
      softCost: 0,
      purchasePrice: 0,
      costTillDate: [],
    },
    siteLocation: "",
    yearsInBusiness: "",
    tarionWarranty: -1,
  });

  const [projectType, setProjectType] = useState({
    projectCost: {
      hardCost: 0,
      softCost: 0,
      landPurchasePrice: 0,
    },
    termRequested: {
      years: 0,
      months: 0,
    },
    amountRequested: 0,
    valueOnCompletion: 0,
  });

  const [consent, setConsent] = useState({
    declarationStatement: "",
    consentToShare: false,
    signature: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const steps = [
    {
      title: 'Company Information',
      body: (
        <div>
          <TextInput
            label="Company Name *"
            value={companyInfo.companyName}
            handleChange={(e) =>
              setCompanyInfo({ ...companyInfo, companyName: e.target.value })
            }
          />
          <TextInput
            label="Contact Email *"
            value={companyInfo.contactEmail}
            handleChange={(e) =>
              setCompanyInfo({ ...companyInfo, contactEmail: e.target.value })
            }
          />
          <TextInput
            label="Contact Phone *"
            value={companyInfo.contactPhone}
            handleChange={(e) =>
              setCompanyInfo({ ...companyInfo, contactPhone: e.target.value })
            }
          />
          <TextInput
            label="Company Website"
            value={companyInfo.companyWebsite}
            handleChange={(e) =>
              setCompanyInfo({ ...companyInfo, companyWebsite: e.target.value })
            }
          />
        </div>
      ),
    },
    {
      title: 'Service Information',
      body: (
        <div>
          <Choose
            label="Loan Type Requested *"
            options={loanTypes}
            value={serviceInfo.loanType}
            handleChange={(e) =>
              setServiceInfo({ ...serviceInfo, loanType: e.target.value })
            }
          />
          <Choose
            label="Project Type *"
            options={[] /* Add the specific project types here */}
            value={serviceInfo.projectType}
            handleChange={(e) =>
              setServiceInfo({ ...serviceInfo, projectType: e.target.value })
            }
          />
          {/* Add other fields related to project cost, location, etc. */}
        </div>
      ),
    },
    {
      title: 'Project Type',
      body: (
        <div>
          <TextInput
            label="Hard Cost"
            value={projectType.projectCost.hardCost}
            handleChange={(e) =>
              setProjectType({
                ...projectType,
                projectCost: {
                  ...projectType.projectCost,
                  hardCost: e.target.value,
                },
              })
            }
          />
          <TextInput
            label="Soft Cost"
            value={projectType.projectCost.softCost}
            handleChange={(e) =>
              setProjectType({
                ...projectType,
                projectCost: {
                  ...projectType.projectCost,
                  softCost: e.target.value,
                },
              })
            }
          />
          {/* Add other fields related to the project */}
        </div>
      ),
    },
    {
      title: 'Consent and Declaration',
      body: (
        <div>
          <TextArea
            label="Declaration Statement"
            value={consent.declarationStatement}
            handleChange={(e) =>
              setConsent({
                ...consent,
                declarationStatement: e.target.value,
              })
            }
          />
          <Choose
            label="Consent to Share Information"
            options={[{ value: true, label: "Yes" }, { value: false, label: "No" }]}
            value={consent.consentToShare}
            handleChange={(e) =>
              setConsent({ ...consent, consentToShare: e.target.value })
            }
          />
          <TextInput
            label="Signature"
            value={consent.signature}
            handleChange={(e) =>
              setConsent({ ...consent, signature: e.target.value })
            }
          />
          <DateInput
            label="Date"
            value={consent.date}
            handleChange={(e) =>
              setConsent({ ...consent, date: e.target.value })
            }
          />
        </div>
      ),
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <section className="mt-10 px-6 py-10 border border-slate-600 rounded-lg">
      <Box sx={{ width: "100%" }} className="mt-8">
        <div className="w-[60%] mx-auto">
          <Stepper activeStep={activeStep}>
            {steps.map((s
