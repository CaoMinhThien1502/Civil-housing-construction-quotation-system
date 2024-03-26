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
      {requestContractData?.buildingDetail.numOKitchen} kithcen, {requestContractData?.buildingDetail.numOBathroom} bathroom, {requestContractData?.buildingDetail.numOBedroom} bedroom, {requestContractData?.buildingDetail.numOFloor} floor,
      {requestContractData?.buildingDetail.hasTunnel?"Has tunmnel":"No tunnel"}.
      </Text>

      <Text style={styles.sectionTitle}>Article 2: Completion Time</Text>
      <Text>Party B undertakes to complete the project by {requestContractData?.buildingDetail.finishDate}.</Text>

      <Text style={styles.sectionTitle}>Article 3: Payment</Text>
      <Text>- Party A undertakes to pay Party B according to the following schedule:</Text>
      <Text>  - {requestContractData?.totalPrice}% of the total contract value upon completion of all work and inspection of quality by the project inspector.</Text>

      <Text style={styles.sectionTitle}>Article 4: Warranty</Text>
      <Text>Party B undertakes to warranty the project for {requestContractData?.requestDate} from the date of project completion.</Text>

      <Text style={styles.sectionTitle}>Article 5: Applicable Law</Text>
      <Text>This contract shall be governed and construed in accordance with the laws of {requestContractData?.applicableLaw}.</Text>

      <Text style={styles.signature}>In witness whereof, the parties have signed their names on {requestContractData?.signatureDate}.</Text>
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
