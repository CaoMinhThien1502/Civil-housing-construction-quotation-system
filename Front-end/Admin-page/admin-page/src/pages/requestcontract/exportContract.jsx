import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';


const ContractPDF = ({ requestContractData }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>CONSTRUCTION CONTRACT</Text>
          <Text style={styles.subTitle}>Party A (Client):</Text>
          <Text>Name: {requestContractData?.userName}</Text>
          <Text>Phone Number: {requestContractData?.phone}</Text>

          <Text style={styles.subTitle}>Party B (Contractor):</Text>
          <Text>Name: CILVIL HOUSING</Text>
          <Text>Address: CILVIL HOUSING TEAM</Text>

          <Text style={styles.sectionTitle}>Article 1: Project Description</Text>
          <Text>Party A contracts Party B to construct a residential building at the address {requestContractData?.placeMeet}. The project includes {requestContractData?.buildingDetail.area} m^2,
            {requestContractData?.buildingDetail.numOKitchen} kitchen, {requestContractData?.buildingDetail.numOBathroom} bathroom, {requestContractData?.buildingDetail.numOBedroom} bedroom, {requestContractData?.buildingDetail.numOFloor} floor,
            {requestContractData?.buildingDetail.hasTunnel ? "Has tunmnel" : "No tunnel"}.
          </Text>

          <Text style={styles.sectionTitle}>Article 2: Completion Time</Text>
          <Text>Party B commits to completing the project within 12 months from the date {requestContractData?.buildingDetail.startDate}.</Text>

          <Text style={styles.sectionTitle}>Article 3: Payment</Text>
          <Text>- Party A undertakes to pay Party B according to the following schedule:</Text>
          <Text>  - {requestContractData?.totalPrice} VND of the total contract value upon completion of all work and inspection of quality by the project inspector.</Text>

          <Text style={styles.sectionTitle}>Article 4: Warranty</Text>
          <Text>Party B commits to warrant the project from {requestContractData?.requestDate} until completion of the construction.</Text>

          <Text style={styles.sectionTitle}>Article 5: Applicable Law</Text>
          <Text>This contract shall be governed and construed in accordance with the laws.</Text>

          <Text style={{ borderBottomWidth: 1, borderBottomColor: 'black', textAlign: 'center', fontSize: 14, marginTop: 20 }}>
            Signature Party A
          </Text>
          <Text style={{ borderBottomWidth: 1, borderBottomColor: 'black', textAlign: 'center', fontSize: 14, marginTop: 20 }}>
            Signature Party B
          </Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
  },
  section: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  signature: {
    marginTop: 20,
    fontStyle: 'italic',
  }
});

const RequestContractPDF = ({ requestContractData }) => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <ContractPDF requestContractData={requestContractData} />
    </PDFViewer>
  );
};

export default RequestContractPDF;
