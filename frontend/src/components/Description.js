import React from "react";
import Container from '@mui/system/Container';
import Box from '@mui/system/Box';

export default function Description() {

    return <Container maxWidth='xl' style={styles.desc}>
        <Box m={2}>
            Aplikacja pozwala przeprowadzić symulacje układów magnetycznych w oparciu o model Isinga. Model Isinga 
            jest schematem matematycznym, pierwotnie używanym w mechanice statycznej do badań przejść fazowych.
            Każdy spin (pojedyncza komórka) ma swoją wartość (plus i minus w podstawowym modelu) która w kolejnych 
            iteracjach ulega zmianie w zależności od wartości sąsiednich spinów. Model dąży tym samym do stanu 
            równowagi, co zaobserwować można jako tworzenie się na siatce domen komórek o tej samej orientacji.
            <br/>

            Panel po lewej stronie pozwala na wybór parametrów symulacji, uwzględniając przy tym definicję 
            komórki elementarnej oraz jej dekorację, komórki obliczeniowej (rozmiar modelu) oraz typ 
            symulacji, w zależności od temperatury oraz wartości całek wymiany i anizotropii: <br/>
            - J - miara wielkości oddziaływań między sąsiednimi atomami, <br/>
            - J<sub>d</sub> - współczynnik anizotropii jednojonowej, <br/>
            - J<sub>ab</sub> - współczynnik wymiany między atomami jednej warstwy,, <br/>
            - J<sub>a</sub>, J<sub>b</sub>  - współczynnik wymiany kolejno między atomami A i B w sąsiednich warstw, <br/>
            - J<sub>da</sub>, J<sub>db</sub>  - współczynnik anizotropii jednojonowej kolejno dla atomów A i B<br/> 
            Obliczenia przeprowadzane są algorytmem Metropolisa z uzyciem metody Monte Carlo.
        </Box>
        
        <Box m={2}>
            Animacja:<br/>
            Kolory każdej z komórek oznacza jego wartość. 
            <br/>Siatka kwadratowa:<br/>
            - Niebieski - orientacja ujemna (-1) <br/>
            - Czerwony - orientacja dodatnia (1) <br/>
            Dla wyższych stopni swobody - jaśniejszy kolor oznacza bardziej skrajną wartość (2 lub -2).
            <br/>Siatka heksagonalna:<br/>
            Komórki siatki heksagonalnej składają się z dwóch spinów:<br/>
            - Czerwony - spin A przyjmuje wartości całkowite z przedziału (-2; 2) <br/>
            - Niebieski  - spin B przyjmuje wielokrotności <sup>1</sup>/<sub>2</sub> z przedziału 
            (<sup>-5</sup>/<sub>2</sub>; <sup>5</sup>/<sub>2</sub>) <br/> 
            Kolor są jaśniejsze dla wyższych wartości spinów.
        </Box>

        <Box m={2}>
            Wykresy:<br/>
            Pod animacją znajdują się wykresy służące do wizualizacji zmian wartości własności 
            fizycznych modelu - energii i magnetyzacji oraz dla symulacji ze zmienną temperaturą, 
            również ciepła właściwego oraz podatności magnetycznej
        </Box>
        


    </Container >
}    

const styles = {
    desc:{
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        borderBottom: 'solid 2px rgba(35, 55, 255, 1)',
        borderLeft: 'solid 2px rgba(35, 55, 255, 1)',
        borderRight: 'solid 2px rgba(35, 55, 255, 1)',
      }
}