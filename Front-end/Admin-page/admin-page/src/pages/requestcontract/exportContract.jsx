import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
import myfont from"../../data/fontFamily/roboto.ttf"
Font.register({ family: "roboto", src: myfont });

const ContractPDF = ({ requestContractData }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>HỢP ĐỒNG XÂY DỰNG</Text>
          <Text style={styles.subTitle}>Bên A (Chủ đầu tư):</Text>
          <Text>Tên: {requestContractData?.customerName}</Text>
          <Text>Địa chỉ: {requestContractData?.customerAddress}</Text>

          <Text style={styles.subTitle}>Bên B (Nhà thầu):</Text>
          <Text>Tên: {requestContractData?.contractorName}</Text>
          <Text>Địa chỉ: {requestContractData?.contractorAddress}</Text>

          <Text style={styles.sectionTitle}>Điều 1: Mô tả dự án</Text>
          <Text>Bên A ủy thầu cho Bên B việc xây dựng công trình nhà ở tại địa chỉ {requestContractData?.projectAddress}. Công trình bao gồm {requestContractData?.projectDescription}.</Text>

          <Text style={styles.sectionTitle}>Điều 2: Thời gian hoàn thành</Text>
          <Text>Bên B cam kết hoàn thành công trình trước ngày {requestContractData?.completionDate}.</Text>

          <Text style={styles.sectionTitle}>Điều 3: Thanh toán</Text>
          <Text>- Bên A cam kết thanh toán cho Bên B theo tiến độ sau:</Text>
          <Text>  - {requestContractData?.paymentPercentage1}% tổng giá trị hợp đồng sau khi hoàn thành phần công việc {requestContractData?.workDescription1} và được kiểm tra bởi chuyên viên kiểm tra công trình.</Text>
          <Text>  - {requestContractData?.paymentPercentage2}% tổng giá trị hợp đồng sau khi hoàn thành toàn bộ công việc và được kiểm tra chất lượng bởi chuyên viên kiểm tra công trình.</Text>

          <Text style={styles.sectionTitle}>Điều 4: Bảo hành</Text>
          <Text>Bên B cam kết bảo hành công trình trong vòng {requestContractData?.warrantyPeriod} kể từ ngày hoàn thành công trình.</Text>

          <Text style={styles.sectionTitle}>Điều 5: Pháp luật áp dụng</Text>
          <Text>Hợp đồng này sẽ được áp dụng và giải quyết theo pháp luật của {requestContractData?.applicableLaw}.</Text>

          <Text style={styles.signature}>Trong chứng nhận sự đồng ý với các điều khoản và điều kiện của hợp đồng này, hai bên đã ký tên vào ngày {requestContractData?.signatureDate}.</Text>
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
    fontFamily: 'roboto'
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'roboto'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'roboto'
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
